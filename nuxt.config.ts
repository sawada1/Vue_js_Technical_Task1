// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: process.env.NODE_ENV === 'development' },
  css: ['~/assets/css/tailwind.css'],
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'TaskFlow',
      titleTemplate: '%s | TaskFlow',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'A simple task manager application for tracking tasks and status.'
        },
        { name: 'theme-color', content: '#2563eb' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'TaskFlow — Task Manager' },
        {
          property: 'og:description',
          content: 'A simple task manager application for tracking tasks and status.'
        },
        { property: 'twitter:card', content: 'summary_large_image' }
      ]
    }
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-toast'
  ]
})