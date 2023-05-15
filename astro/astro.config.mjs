import image from "@astrojs/image";
import sanity from "astro-sanity";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import remarkToc from "remark-toc";
const { SANITY_READ_TOKEN } = loadEnv(import.meta.env.MODE, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  experimental: {
    // assets: true,
  },
  markdown: {
    // Applied to .md and .mdx files
    remarkPlugins: [remarkToc],
  },
  integrations: [
    sanity({
      projectId: "9vyslszl",
      dataset: "production",
      apiVersion: "2023-05-01",
      useCdn: false,
      token: SANITY_READ_TOKEN,
    }),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
  ],
});
