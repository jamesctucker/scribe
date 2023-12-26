// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/google-fonts",
    "@vee-validate/nuxt",
    "@nuxtjs/supabase",
    "@hebilicious/vue-query-nuxt",
    "@nuxtjs/plausible",
    "nuxt-bugsnag",
    "nuxt-vitest",
    "@nuxtjs/tailwindcss",
    "dayjs-nuxt"
  ],
  googleFonts: {
    families: {
      Inter: true,
    },
  },
  supabase: {
    // TODO: don't hardcode this
    redirect: false,
  },
  runtimeConfig: {
    rssFeedUrl: "123",
    deepgramKey: "test123",
  },
});
