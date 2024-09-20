import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@primevue/nuxt-module'
  ],
  app: {
    baseURL: '/stream-stats/',
  },

  primevue: {
    options: {
      theme: {
        preset: Aura,
        options:
        {
          darkModeSelector: 'system',

        }


      }
    }
  }
})
