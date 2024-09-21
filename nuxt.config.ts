import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  // devtools: { enabled: true },
  modules: [
    '@primevue/nuxt-module'
  ],
  app: {
    baseURL: '/stream-stats/',
    head: {
      title: 'Stream Stats',

      link: [
        {
          id: 'theme-link',
          rel: 'stylesheet',
          href: '/stream-stats/themes/aura-light-amber/theme.css',
        },
      ],

    }

  },

  primevue: {
    options: {
      unstyled: true
    }
  },
  css: ['primeflex/primeflex.css'],

})
