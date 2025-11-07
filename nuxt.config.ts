// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxt/content",
    "nuxt-studio",
    "@vueuse/nuxt",
    "nuxt-og-image",
    "motion-v/nuxt",
  ],
  studio: {
    route: "/admin",
    repository: {
      provider: "github", // only GitHub is currently supported
      owner: "FabianRzepka", // your GitHub username or organization
      repo: "Portfolio2025", // your repository name
      branch: "main", // the branch to commit to (default: main)
      rootDir: "", // optional: if your Nuxt app is in a subdirectory (default: '')
    },
  },
  devtools: {
    enabled: true,
  },
  colorMode: {
    preference: "dark",
  },
  css: ["~/assets/css/main.css"],

  compatibilityDate: "2024-11-01",
  image: {
    format: ["webp"],
  },
  nitro: {
    prerender: {
      routes: ["/"],
      crawlLinks: true,
    },
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },
});
