import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/static";

import tailwind from "@astrojs/tailwind";

const url =
  import.meta.VERCEL_ENV === "production"
    ? "https://the-notes-ten.vercel.app/"
    : "http://localhost:3000";

// https://astro.build/config
export default defineConfig({
  site: url,
  integrations: [mdx(), sitemap(), tailwind()],
  adapter: vercel(),
  output: "static",
});
