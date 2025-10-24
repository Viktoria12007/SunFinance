// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', '@fortawesome/fontawesome-svg-core/styles.css'],
  modules: [
      '@nuxtjs/tailwindcss'
  ],
  plugins: [
      '~/plugins/fontawesome'
  ],
  app: {
    head: {
        title: 'SunFinance',
        htmlAttrs: { lang: 'en' },
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
        meta: [
            { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        ],
    },
  },
})
