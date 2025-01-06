export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    '@nuxt/icon',
    '@nuxtjs/storybook',
    '@nuxt/test-utils/module',
  ],
  css: ['@/assets/css/tailwind.css'],

  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
      mapboxAccessToken: process.env.MAPBOX_ACCESS_TOKEN,
    },
  },

  supabase: {
    redirect: false
  },

  plugins: [
    { src: '~/plugins/piniaPersistedState.client.ts', mode: 'client' },
  ],
  compatibilityDate: '2025-01-02',

  imports: {
    dirs: [
      'types',
      'utils',
      'composables',
    ]
  },

  components: {
    dirs: [
      '~/components',
    ]
  },
});