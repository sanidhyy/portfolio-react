import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// sanity client
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: "2022-02-01",
  useCdn: true,
  token: import.meta.env.VITE_SANITY_TOKEN,
  ignoreBrowserTokenWarning: true,
});

// sanity img url builder
const builder = imageUrlBuilder(client);

// export image
export const urlFor = (source) => builder.image(source);
