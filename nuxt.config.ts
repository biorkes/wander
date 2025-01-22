// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n'
  ],
  i18n: {
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        file: 'en.json'
      },
      {
        code: 'bg',
        file: 'bg.json'
      }
    ]
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
      apiKey: process.env.NUXT_PUBLIC_API_KEY,
      accessoriesApiUrl: process.env.ACCESSORIES_API_URL
    }
  }
})
