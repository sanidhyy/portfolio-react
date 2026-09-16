import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

const builder = createImageUrlBuilder({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: "production",
});

export const urlFor = (source: SanityImageSource) =>
  builder.image(source).url();

export type QueryType =
  | "abouts"
  | "works"
  | "experiences"
  | "skills"
  | "testimonials"
  | "brands";

export async function fetchQuery<T>(type: QueryType): Promise<T> {
  const res = await fetch(`/api/sanity/query?type=${encodeURIComponent(type)}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch ${type}`);
  }

  return res.json() as Promise<T>;
}

export async function submitContact(data: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to submit contact form");
  }
}
