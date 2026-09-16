import type { Config } from "@netlify/functions";

import { getSanityClient, jsonResponse } from "../lib/sanity";

const EMAIL_REGEX =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

const isFilledString = (value: unknown): value is string =>
  typeof value === "string" && !/^\s*$/.test(value);

export default async (req: Request) => {
  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  if (!body || typeof body !== "object") {
    return jsonResponse({ error: "Invalid request body" }, 400);
  }

  const { name, email, message } = body as Record<string, unknown>;

  if (!isFilledString(name) || name.trim().length < 3) {
    return jsonResponse({ error: "Invalid name" }, 400);
  }

  if (!isFilledString(email) || !EMAIL_REGEX.test(email.trim())) {
    return jsonResponse({ error: "Invalid email" }, 400);
  }

  if (!isFilledString(message) || message.trim().length < 3) {
    return jsonResponse({ error: "Invalid message" }, 400);
  }

  try {
    const client = getSanityClient();
    await client.create({
      _type: "contact",
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });
    return jsonResponse({ ok: true });
  } catch (error) {
    console.error("Sanity contact create failed:", error);
    return jsonResponse({ error: "Failed to submit contact form" }, 500);
  }
};

export const config: Config = {
  path: "/api/contact",
  method: "POST",
};
