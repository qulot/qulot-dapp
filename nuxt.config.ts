const defaultNetworkKey = process.env.DEFAULT_NETWORK_KEY || 'mumbai'
const mumbaiSubgraphEndpoint = process.env.MUMBAI_SUBGRAPH_ENDPOINT || ''
const mumbaiQulotContract = process.env.MUMBAI_QULOT_CONTRACT || ''

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // https://nuxt.com/docs/guide/going-further/runtime-config
  runtimeConfig: {
    public: {
      defaultNetworkKey,
      contracts: {
        mumbai: mumbaiQulotContract,
      },
    },
  },

  // server side rendering mode
  ssr: true,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/tailwind.scss', '~/assets/css/transition.scss'],

  // https://nuxt.com/docs/getting-started/transitions
  app: {
    pageTransition: { name: 'fade', mode: 'out-in' },
  },

  modules: [
    // https://google-fonts.nuxtjs.org/
    '@nuxtjs/google-fonts',
    // https://nuxt-svg-transformer.netlify.app/get-started
    'nuxt-svg-transformer',
    // https://formkit.com/getting-started/installation#with-nuxt
    '@formkit/nuxt',
    // https://tailwindcss.nuxtjs.org/
    '@nuxtjs/tailwindcss',
    // https://v8.i18n.nuxtjs.org/getting-started/setup
    '@nuxtjs/i18n',
    // https://pinia.vuejs.org/ssr/nuxt.html
    '@pinia/nuxt',
    // https://apollo.nuxtjs.org/getting-started/quick-start
    '@nuxtjs/apollo',
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
    styleDefault:
      'max-width: 100%; max-height: 100%; mix-blend-mode: normal !important;',
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // https://apollo.nuxtjs.org/getting-started/quick-start
  apollo: {
    clients: {
      mumbai: {
        connectToDevTools: true,
        httpEndpoint: mumbaiSubgraphEndpoint,
      },
    },
  },
})
