import { createClient } from "@sanity/client";

const DATASET = "production";
const API_VERSION = "2022-02-01";

export function getSanityClient() {
  const projectId =
    process.env.SANITY_PROJECT_ID ?? process.env.VITE_SANITY_PROJECT_ID;
  const token = process.env.SANITY_TOKEN;

  if (!projectId || !token) {
    throw new Error("Missing Sanity environment variables");
  }

  return createClient({
    projectId,
    dataset: DATASET,
    apiVersion: API_VERSION,
    useCdn: false,
    token,
  });
}

export function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
