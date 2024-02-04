import type { Generation } from "@/src/types";

const generateSuggestion = async (
  prompt: string,
  abortController?: AbortController | null
) => {
  try {
    const response = await fetch(`/api/notes/ai/generate`, {
      method: "POST",
      headers: { "Content-Type": "application-json" },
      body: JSON.stringify({ prompt: prompt }),
      signal: abortController?.signal,
    });

    const data = await response.json();

    abortController = null;

    return data as Generation;
  } catch (error) {
    return JSON.stringify({ error: error });
  }
};

export default generateSuggestion;
