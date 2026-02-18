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
    const { faceImage, audioData, type, language } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Service configuration error." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let systemPrompt = "";
    let userContent: any[] = [];

    if (type === "face") {
      if (!faceImage) {
        return new Response(JSON.stringify({ error: "Face image is required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      systemPrompt = `You are an expert face liveness detection AI. Analyze the provided face image to determine if it shows a live person or a spoofing attempt (photo of a photo, screen display, mask, etc.).

You MUST respond ONLY with valid JSON — no markdown, no extra text:
{
  "isLive": <boolean>,
  "livenessScore": <number 0-100>,
  "confidence": <number 0-100>,
  "faceDetected": <boolean>,
  "faceCount": <number>,
  "checks": [
    {"name": "<check name>", "passed": <boolean>, "detail": "<brief detail>"}
  ],
  "explanation": "<1-2 sentence explanation in ${language || "en"}>"
}

Liveness checks to perform:
- Skin texture naturalness (real skin vs printed/screen texture)
- 3D depth cues (real face has depth, photo is flat)
- Eye reflection consistency (natural light reflections)
- Micro-expressions present
- Background context (holding a phone/photo to camera?)
- Image quality consistency (edges, moiré patterns from screens)
- Color temperature naturalness`;

      const base64Data = faceImage.startsWith("data:") ? faceImage.split(",")[1] : faceImage;
      const mimeMatch = faceImage.match(/^data:(image\/\w+);/);
      const mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";

      userContent = [
        { type: "text", text: "Analyze this face image for liveness detection:" },
        { type: "image_url", image_url: { url: `data:${mimeType};base64,${base64Data}` } },
      ];
    } else if (type === "voice") {
      systemPrompt = `You are an expert voice authenticity detection AI. Analyze the provided voice description/characteristics to determine if the voice appears natural or synthetic.

You MUST respond ONLY with valid JSON — no markdown, no extra text:
{
  "isNatural": <boolean>,
  "naturalScore": <number 0-100>,
  "confidence": <number 0-100>,
  "checks": [
    {"name": "<check name>", "passed": <boolean>, "detail": "<brief detail>"}
  ],
  "explanation": "<1-2 sentence explanation in ${language || "en"}>"
}

Voice checks: Natural breathing patterns, pitch variation, background noise consistency, speech rhythm naturalness, emotional tone consistency.`;

      userContent = [
        { type: "text", text: `Analyze this voice data for authenticity. Audio characteristics: ${JSON.stringify(audioData)}` },
      ];
    } else {
      return new Response(JSON.stringify({ error: "Invalid analysis type. Use 'face' or 'voice'." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

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
            { role: "user", content: userContent },
          ],
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Service temporarily busy." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      return new Response(JSON.stringify({ error: "Analysis failed." }),
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
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-biometrics error:", e);
    return new Response(
      JSON.stringify({ error: "Analysis failed. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
