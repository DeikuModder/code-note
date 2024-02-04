import { cohere } from "@/lib/cohereClient";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = (await request.json()) as { prompt: string };

    const generate = await cohere.generate({
      prompt: data.prompt,
    });

    return new Response(JSON.stringify(generate), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Couldn't get response" }), {
      status: 500,
    });
  }
};
