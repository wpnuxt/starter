// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@wpnuxt/core'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { isr: true }
  },

  compatibilityDate: '2026-02-09',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  wpNuxt: {
    wordpressUrl: process.env.WPNUXT_WORDPRESS_URL,
    imageRelativePaths: true
  }
})
