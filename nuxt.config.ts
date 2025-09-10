// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@prisma/nuxt', '@pinia/nuxt', 'nuxt-toast'],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  prisma: {
    datasourceUrl: process.env.DATABASE_URL,
    autoSetupPrisma: true,
    errorFormat: 'colorless',
  },
})