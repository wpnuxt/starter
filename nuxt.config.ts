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

  compatibilityDate: '2026-04-15',

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
    imageRelativePaths: true,
    // Auto-generate fragments + queries for every Custom Post Type in your
    // WordPress schema. Drop a file with the same name in `extend/queries/`
    // (or `extend/queries/fragments/`) to replace the generated one.
    // See https://wpnuxt.com/guide/custom-post-types
    cpt: {
      enabled: true
    }
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
