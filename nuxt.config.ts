// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // server side rendering mode
  ssr: true,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/tailwind.scss', '~/assets/css/transition.scss'],

  modules: [
    // https://google-fonts.nuxtjs.org/
    '@nuxtjs/google-fonts',
    // https://nuxt-svg-transformer.netlify.app/get-started
    'nuxt-svg-transformer',
    // https://formkit.com/getting-started/installation#with-nuxt
    '@formkit/nuxt',
    // https://tailwindcss.nuxtjs.org/
    '@nuxtjs/tailwindcss',
    // https://pinia.vuejs.org/ssr/nuxt.html
    '@pinia/nuxt',
    // https://v8.i18n.nuxtjs.org/getting-started/setup
    '@nuxtjs/i18n',
  ],

  // https://tailwindcss.nuxtjs.org/getting-started/options
  tailwindcss: {
    viewer: false,
  },

  // https://v8.i18n.nuxtjs.org/getting-started/basic-usage
  i18n: {
    langDir: 'locales',
    defaultLocale: 'en',
    strategy: 'no_prefix',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'vi', name: 'Tiếng Việt', file: 'vi.json' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n',
      alwaysRedirect: true,
      redirectOn: 'root',
    },
    vueI18n: {
      fallbackLocale: 'en',
      silentTranslationWarn: true,
    },
  },

  googleFonts: {
    download: true,
    families: {
      Inter: [400, 500, 700],
    },
  },

  // https://nuxt-svg-transformer.netlify.app/configuration
  svgTransformer: {
    componentName: 'SvgIcon', // type: `string`
    fallback: '<svg>...</svg>', // type `string` | `false`
    lazy: true, // type: `boolean`
    log: true, // type: `boolean`,
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
