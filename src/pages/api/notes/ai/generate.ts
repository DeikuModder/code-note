import { cohere } from "@/lib/cohereClient";
import type { Generation } from "@/src/types";
import { SSE } from "@/utils/sse";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const prompt = url.searchParams.get("prompt");

    if (!prompt) {
      return new Response("Missing 'prompt' parameter", { status: 400 });
    }

    return SSE({ request }, async (sendEvent) => {
      const response = await cohere.generateStream({
        prompt: prompt as string,
        model: "command-light",
        maxTokens: 150,
        temperature: 0.7,
      });

      for await (const part of response) {
        if (part.eventType === "text-generation") {
          sendEvent(part.text);
        }
      }

      sendEvent("END");
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Couldn't get response" }), {
      status: 500,
    });
  }
};
