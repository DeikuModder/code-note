import { cohere } from "@/lib/cohereClient";
import type { Generation } from "@/src/types";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = (await request.json()) as { prompt: string };

    const generate = (await cohere.generate({
      prompt: data.prompt,
      model: "command-light",
      maxTokens: 150,
      temperature: 0.5,
    })) as Generation;

    return new Response(JSON.stringify(generate.generations[0].text), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Couldn't get response" }), {
      status: 500,
    });
  }
};
