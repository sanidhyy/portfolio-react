import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// sanity client
export const client = sanityClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: process.env.REACT_APP_SANITY_DATASET,
  apiVersion: "2022-02-01",
  useCdn: true,
  token: process.env.REACT_APP_SANITY_TOKEN,
  ignoreBrowserTokenWarning: true,
});

// sanity img url builder
const builder = imageUrlBuilder(client);

// export image
export const urlFor = (source) => builder.image(source);
