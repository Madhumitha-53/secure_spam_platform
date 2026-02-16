import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, language } = await req.json();

    if (!message || typeof message !== "string") {
      return new Response(
        JSON.stringify({ error: "Message is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (message.length > 2000) {
      return new Response(
        JSON.stringify({ error: "Message too long (max 2000 characters)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (message.length < 5) {
      return new Response(
        JSON.stringify({ error: "Message too short (min 5 characters)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const validLanguages = ["en", "hi", "ta", "te", "kn", "bn", "mr", "gu", "pa", "or", "as"];
    if (language && !validLanguages.includes(language)) {
      return new Response(
        JSON.stringify({ error: "Invalid language" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "Service configuration error. Please try again later." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = `You are an expert fraud and scam detection AI for Indian Overseas Bank (IOB). Your job is to analyze messages (SMS, WhatsApp, call transcripts) and determine if they are scams.

You MUST respond ONLY with valid JSON matching this exact schema — no markdown, no extra text:
{
  "probability": <number 0-100>,
  "riskLevel": "<safe|low|medium|high|critical>",
  "indicators": ["<indicator_key>", ...],
  "recommendation": "<recSafe|recLowRisk|recCaution|recAvoid|recBlock>",
  "breakdown": [{"label": "<indicator_key>", "score": <number 0-100>}, ...],
  "aiExplanation": "<brief explanation in ${language || "en"}>"
}

Indicator keys to use (pick all that apply):
- "otpRequest" — asks for OTP, PIN, password, CVV, or any secret code
- "urgencyTactics" — creates artificial urgency (24 hours, immediately, last chance, account blocked, etc.)
- "suspiciousLink" — contains bit.ly, tinyurl, suspicious domains, or "click here" type language
- "lotteryPrize" — mentions winning prizes, lottery, rewards, congratulations with money
- "kycThreat" — threatens KYC/PAN/Aadhaar expiry or account closure for not updating details
- "phoneNumber" — includes suspicious phone numbers to call back
- "genericGreeting" — uses "Dear Customer", "Valued User" instead of actual name
- "threatLanguage" — uses threatening language about blocking accounts, unauthorized access
- "impersonation" — pretends to be a bank, government agency, or authority
- "financialLure" — offers unrealistic financial returns, loans, or cashback

Rules for scoring:
- Messages asking for OTP/PIN/password are ALWAYS at least "high" risk (probability >= 70)
- Messages with urgency + OTP request are ALWAYS "critical" (probability >= 85)
- Messages mentioning lottery/prizes with links are ALWAYS "critical" (probability >= 90)
- KYC threats with phone numbers or links are ALWAYS "high" (probability >= 65)
- Legitimate bank messages about FD maturity, branch visits, or informational notices are "safe" (probability <= 10)
- Generic greetings alone are "low" risk
- Analyze in ANY language — Hindi, Tamil, Telugu, Kannada, Bengali, Marathi, or any Indian language

Risk levels:
- safe: 0-10 — genuine message
- low: 11-30 — slightly suspicious but likely safe
- medium: 31-55 — moderately suspicious, proceed with caution
- high: 56-79 — very likely a scam
- critical: 80-100 — definitely a scam, block immediately

The breakdown scores should show each indicator's relative contribution (they should sum to ~100).
The aiExplanation should be 1-2 sentences explaining WHY in the user's language.`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            {
              role: "user",
              content: `Analyze this message for scam/fraud indicators:\n\n"${message}"`,
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Service temporarily busy. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      return new Response(
        JSON.stringify({ error: "Failed to analyze message. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    // Parse the JSON from AI response (strip markdown code fences if present)
    let cleanContent = content.trim();
    if (cleanContent.startsWith("```")) {
      cleanContent = cleanContent.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
    }

    const result = JSON.parse(cleanContent);

    // Validate and clamp values
    result.probability = Math.max(0, Math.min(100, Math.round(result.probability)));
    if (!["safe", "low", "medium", "high", "critical"].includes(result.riskLevel)) {
      result.riskLevel = result.probability >= 80 ? "critical" :
        result.probability >= 60 ? "high" :
        result.probability >= 35 ? "medium" :
        result.probability > 10 ? "low" : "safe";
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-scam error:", e);
    return new Response(
      JSON.stringify({ error: "Failed to analyze message. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
