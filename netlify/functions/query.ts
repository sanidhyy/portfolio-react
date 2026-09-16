import type { Config } from "@netlify/functions";

import { getSanityClient, jsonResponse } from "../lib/sanity";

const QUERY_ALLOWLIST = {
  abouts: '*[_type == "abouts"]',
  works: '*[_type == "works"]',
  experiences: '*[_type == "experiences"]',
  skills: '*[_type == "skills"]',
  testimonials: '*[_type == "testimonials"]',
  brands: '*[_type == "brands"]',
} as const;

type QueryType = keyof typeof QUERY_ALLOWLIST;

const isQueryType = (value: string): value is QueryType =>
  value in QUERY_ALLOWLIST;

export default async (req: Request) => {
  if (req.method !== "GET") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  const type = new URL(req.url).searchParams.get("type");

  if (!type || !isQueryType(type)) {
    return jsonResponse({ error: "Invalid query type" }, 400);
  }

  try {
    const client = getSanityClient();
    const data = await client.fetch(QUERY_ALLOWLIST[type]);
    return jsonResponse(data);
  } catch (error) {
    console.error("Sanity query failed:", error);
    return jsonResponse({ error: "Failed to fetch data" }, 500);
  }
};

export const config: Config = {
  path: "/api/sanity/query",
  method: "GET",
};
