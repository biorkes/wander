// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_API_URL,
      apiKey: process.env.NUXT_API_KEY,
      accessoriesApiUrl: process.env.ACCESSORIES_API_URL
    }
  }
})
