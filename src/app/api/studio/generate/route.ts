import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured in .env.local" },
        { status: 500 }
      );
    }

    const { wallImage, mandalaImage } = await request.json();

    if (!wallImage || !mandalaImage) {
      return NextResponse.json(
        { error: "Both wall image and mandala image are required." },
        { status: 400 }
      );
    }

    // Helper to extract base64 data and mimeType from data URL
    const parseDataUrl = (dataUrl: string) => {
      const matches = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
      if (!matches) {
        throw new Error("Invalid image format");
      }
      return {
        mimeType: matches[1],
        base64Data: matches[2],
      };
    };

    let parsedWall, parsedMandala;
    try {
      parsedWall = parseDataUrl(wallImage);
      parsedMandala = parseDataUrl(mandalaImage);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse images. Ensure they are valid data URLs." },
        { status: 400 }
      );
    }

    // Stage 1 & Stage 2: Call Gemini and Imagen 3 with full fallback resilience
    try {
      // Stage 1: Call Gemini to analyze the images and generate a descriptive layout prompt
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

      const promptText = `combine these two images and generate a new one where the mandala should be painted on the wall. Output ONLY the final descriptive image prompt. Do not add any conversational text, markdown formatting, or code blocks.`;

      const geminiPayload = {
        contents: [
          {
            parts: [
              { text: promptText },
              {
                inlineData: {
                  mimeType: parsedWall.mimeType,
                  data: parsedWall.base64Data,
                },
              },
              {
                inlineData: {
                  mimeType: parsedMandala.mimeType,
                  data: parsedMandala.base64Data,
                },
              },
            ],
          },
        ],
      };

      console.log("Stage 1: Calling Gemini 2.5 Flash for multimodal analysis...");
      const geminiRes = await fetch(geminiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(geminiPayload),
      });

      if (!geminiRes.ok) {
        const errorText = await geminiRes.text();
        console.warn("Gemini API failed or returned non-ok response. Triggering client-side fallback. Error:", errorText);
        return NextResponse.json({
          success: true,
          fallback: true,
          prompt: "Spatial canvas blend fallback triggered due to Gemini model load.",
        });
      }

      const geminiData = await geminiRes.json();
      const generatedPrompt = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!generatedPrompt) {
        console.warn("Failed to extract design prompt from Gemini response. Triggering client-side fallback.");
        return NextResponse.json({
          success: true,
          fallback: true,
          prompt: "Spatial canvas blend fallback triggered due to prompt extraction issue.",
        });
      }

      console.log("Generated prompt for Imagen 4:", generatedPrompt.trim());

      const imagenUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`;

      const imagenPayload = {
        instances: [
          {
            prompt: generatedPrompt.trim()
          }
        ],
        parameters: {
          sampleCount: 1,
          aspectRatio: "1:1",
          outputMimeType: "image/jpeg"
        }
      };

      try {
        console.log("Stage 2: Calling Imagen 4 for high-res rendering...");
        const imagenRes = await fetch(imagenUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(imagenPayload),
        });

        if (!imagenRes.ok) {
          const errorText = await imagenRes.text();
          console.warn("Imagen API failed or returned non-ok response. Triggering client-side fallback. Error:", errorText);
          return NextResponse.json({
            success: true,
            fallback: true,
            prompt: generatedPrompt.trim(),
          });
        }

        const imagenData = await imagenRes.json();
        const generatedImageBase64 = imagenData?.predictions?.[0]?.bytesBase64Encoded;

        if (!generatedImageBase64) {
          console.warn("No image returned from Imagen API. Triggering client-side fallback.");
          return NextResponse.json({
            success: true,
            fallback: true,
            prompt: generatedPrompt.trim(),
          });
        }

        return NextResponse.json({
          success: true,
          image: `data:image/jpeg;base64,${generatedImageBase64}`,
          prompt: generatedPrompt.trim(),
        });
      } catch (imagenError) {
        console.warn("Imagen API execution threw an exception. Triggering client-side fallback:", imagenError);
        return NextResponse.json({
          success: true,
          fallback: true,
          prompt: generatedPrompt.trim(),
        });
      }
    } catch (apiError) {
      console.warn("Orchestration pipeline execution threw an exception. Triggering client-side fallback:", apiError);
      return NextResponse.json({
        success: true,
        fallback: true,
        prompt: "Spatial canvas blend fallback triggered due to remote API exception.",
      });
    }
  } catch (error) {
    console.error("Studio AI Generation API error:", error);
    const message = error instanceof Error ? error.message : "Internal server error during image generation.";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
