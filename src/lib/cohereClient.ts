import { CohereClient } from "cohere-ai";

export const cohere = new CohereClient({
  token: import.meta.env.AI_API_KEY,
});
