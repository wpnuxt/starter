// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@wpnuxt/core',
    '@wpnuxt/auth',
    '@wpnuxt/blocks'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2026-02-11',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  graphqlMiddleware: {
    errorOverlay: false
  },

  image: {
    alias: {
      '/wp-content': `${process.env.WPNUXT_WORDPRESS_URL}/wp-content`
    }
  },

  wpNuxt: {
    wordpressUrl: process.env.WPNUXT_WORDPRESS_URL,
    imageRelativePaths: true
  },

  wpNuxtAuth: {
    providers: {
      password: { enabled: true },
      headlessLogin: {
        enabled: true
      }
    }
  },

  wpNuxtBlocks: {
    imageDomains: [new URL(process.env.WPNUXT_WORDPRESS_URL || 'http://localhost').hostname]
  }
})
