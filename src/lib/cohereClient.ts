import { CohereClient } from "cohere-ai";

const token = import.meta.env.AI_API_KEY;

export const cohere = new CohereClient({
  token: token,
});
