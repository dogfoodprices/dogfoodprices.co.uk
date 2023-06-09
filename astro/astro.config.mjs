import image from "@astrojs/image";
import sanity from "astro-sanity";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import remarkToc from "remark-toc";
import sitemap from "@astrojs/sitemap";
import purgecss from "astro-purgecss";
const { SANITY_READ_TOKEN } = loadEnv(import.meta.env.MODE, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  site: "https://dogfoodprices.co.uk",
  compressHTML: true,
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
    sitemap(),
    purgecss(),
  ],
});
