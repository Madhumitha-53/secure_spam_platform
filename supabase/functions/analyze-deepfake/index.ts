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
    const { image, language } = await req.json();

    if (!image || typeof image !== "string") {
      return new Response(
        JSON.stringify({ error: "Image data is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Service configuration error." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = `You are an expert deepfake and image authenticity detection AI. Analyze the provided image for signs of AI generation, manipulation, or deepfake indicators.

You MUST respond ONLY with valid JSON matching this exact schema — no markdown, no extra text:
{
  "authenticity": <number 0-100, where 100 = completely authentic>,
  "isDeepfake": <boolean>,
  "confidence": <number 0-100>,
  "riskLevel": "<authentic|low|medium|high|critical>",
  "indicators": [
    {"name": "<indicator name>", "detected": <boolean>, "severity": "<low|medium|high>", "detail": "<brief explanation>"}
  ],
  "breakdown": [
    {"label": "<category>", "score": <number 0-100>}
  ],
  "explanation": "<2-3 sentence explanation in ${language || "en"}>"
}

Analyze for these deepfake/manipulation indicators:
- Facial inconsistencies (asymmetry, blurring around edges, unnatural skin texture)
- Eye anomalies (irregular reflections, mismatched pupils, unnatural gaze)
- Lighting inconsistencies (shadows not matching light source, unnatural highlights)
- Background artifacts (warping, blending edges, inconsistent blur)
- Compression artifacts suggesting manipulation
- Hair boundary irregularities
- Teeth/mouth anomalies
- Color inconsistencies or unnatural saturation
- Metadata manipulation signs
- GAN artifacts (checkerboard patterns, frequency domain anomalies)

Breakdown categories: "Facial Consistency", "Eye Analysis", "Lighting & Shadows", "Background Integrity", "Texture Quality", "Edge Analysis"

Risk levels:
- authentic: 0-10% deepfake probability — genuine image
- low: 11-30% — minor anomalies, likely authentic
- medium: 31-55% — some suspicious elements
- high: 56-79% — likely manipulated/AI-generated
- critical: 80-100% — definitely deepfake/manipulated`;

    // Build message content with image
    const base64Data = image.startsWith("data:") ? image.split(",")[1] : image;
    const mimeMatch = image.match(/^data:(image\/\w+);/);
    const mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";

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
              content: [
                { type: "text", text: "Analyze this image for deepfake/manipulation indicators:" },
                { type: "image_url", image_url: { url: `data:${mimeType};base64,${base64Data}` } },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Service temporarily busy. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      return new Response(JSON.stringify({ error: "Failed to analyze image." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;
    if (!content) throw new Error("No content in AI response");

    let cleanContent = content.trim();
    if (cleanContent.startsWith("```")) {
      cleanContent = cleanContent.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
    }

    const result = JSON.parse(cleanContent);
    result.authenticity = Math.max(0, Math.min(100, Math.round(result.authenticity)));
    result.confidence = Math.max(0, Math.min(100, Math.round(result.confidence)));

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-deepfake error:", e);
    return new Response(
      JSON.stringify({ error: "Failed to analyze image. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
