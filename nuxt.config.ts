import { nodePolyfills } from 'vite-plugin-node-polyfills'

const isProduction = process?.env?.NODE_ENV === 'production'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // https://nuxt.com/docs/guide/going-further/runtime-config
  runtimeConfig: {
    mail: {
      message: {
        to: process.env.NUXT_MAIL_MESSAGE_TO || 'email-default-config',
        from: process.env.NUXT_MAIL_MESSAGE_FROM || '',
      },
      smtp: {
        host: process.env.NUXT_SMTP_HOST || '',
        port: process.env.NUXT_SMTP_PORT || '',
        auth: {
          user: process.env.NUXT_SMTP_AUTH_USER || '',
          pass: process.env.NUXT_SMTP_AUTH_PASS || '',
        },
      },
    },
    recaptcha: {
      secretKey: process.env.NUXT_RECAPTCHA_SECRETKEY || '',
    },
    public: {
      isProduction,
      defaultChainId: parseInt(
        process.env.NUXT_PUBLIC_DEFAULT_CHAIN_ID || '80001'
      ),
      infuraApiKey: process.env.NUXT_PUBLIC_INFURA_API_KEY || '',
      walletConnectProjectId:
        process.env.NUXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',
      tokenDefaultDecimals: parseInt(
        process.env.NUXT_PUBLIC_TOKEN_DEFAULT_DECIMALS || '8'
      ),
      metadata: {
        appName: process.env.NUXT_PUBLIC_METADATA_APP_NAME || 'Qulot',
        appIcon: process.env.NUXT_PUBLIC_METADATA_APP_ICON || '',
        appUrl: process.env.NUXT_PUBLIC_METADATA_APP_URL || '',
      },
      contracts: {
        '80001': process.env.NUXT_PUBLIC_CONTRACTS_80001 || '',
        '137': process.env.NUXT_PUBLIC_CONTRACTS_137 || '',
      },
      emailFrom: process.env.NUXT_MAIL_MESSAGE_FROM || '',
      recaptcha: {
        v2SiteKey: process.env.NUXT_PUBLIC_RECAPTCHA_V2_SITE_KEY || '',
      },
      apollo: {
        endpoints: {
          qulot:
            process.env.NUXT_PUBLIC_APOLLO_ENDPOINTS_QULOT ||
            'http://localhost:5000/query',
          '80001':
            process.env.NUXT_PUBLIC_APOLLO_ENDPOINTS_80001 ||
            'http://localhost:8000',
          '137':
            process.env.NUXT_PUBLIC_APOLLO_ENDPOINTS_137 ||
            'http://localhost:8000',
        },
        wsEndpoints: {
          qulot:
            process.env.NUXT_PUBLIC_APOLLO_WS_ENDPOINTS_QULOT ||
            'ws://localhost:5000/query',
        },
      },
      oidc: {
        google: {
          clientId:
            process.env.NUXT_PUBLIC_OIDC_GOOGLE_CLIENT_ID || 'google-client-id',
          endpoint:
            process.env.NUXT_PUBLIC_OIDC_GOOGLE_ENDPOINT ||
            'https://accounts.google.com',
        },
      },
    },
  },

  // server side rendering mode
  ssr: true,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/tailwind.scss',
    '~/assets/css/transition.scss',
    'vue-final-modal/style.css',
    'tippy.js/dist/tippy.css',
  ],

  // https://nuxt.com/docs/getting-started/transitions
  app: {
    pageTransition: { name: 'fade', mode: 'out-in' },
    head: {
      viewport:
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
    },
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
    // https://dansnow.github.io/vue-recaptcha/guide/nuxt
    'vue-recaptcha/nuxt',
    // https://nuxt.com/modules/gtag
    'nuxt-gtag',
  ],

  // https://nuxt.com/docs/api/configuration/nuxt-config#imports
  imports: {
    // Auto-import pinia stores defined in `~/stores`
    dirs: ['stores'],
  },

  // https://tailwindcss.nuxtjs.org/getting-started/options
  tailwindcss: {
    viewer: false,
  },

  // https://v8.i18n.nuxtjs.org/getting-started/basic-usage
  i18n: {
    debug: !isProduction,
    langDir: 'locales',
    defaultLocale: 'en',
    strategy: 'prefix',
    lazy: true,
    locales: [
      { code: 'en', name: 'English', file: 'en.json', iso: 'en-US' },
      { code: 'vi', name: 'Tiếng Việt', file: 'vi.json', iso: 'vi-VN' },
      { code: 'zh', name: '中文', file: 'zh.json', iso: 'zh-CN' },
      { code: 'ja', name: '日本語', file: 'ja.json', iso: 'ja-JP' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
      redirectOn: 'root',
    },
    compilation: {
      strictMessage: false,
    },
    vueI18n: './vue-i18n.options.ts',
  },

  googleFonts: {
    download: true,
    families: {
      Inter: [400, 500, 700],
    },
  },

  // https://nuxt.com/modules/gtag#configuration
  gtag: {
    id: 'G-KVPNJLNVXY',
  },

  // https://nuxt-svg-transformer.netlify.app/configuration
  svgTransformer: {
    componentName: 'SvgIcon', // type: `string`
    fallback: '<svg>...</svg>', // type `string` | `false`
    lazy: true, // type: `boolean`
    log: false, // type: `boolean`,
    styleDefault:
      'max-width: 100%; max-height: 100%; width: 100%; height: 100%;mix-blend-mode: normal !important;',
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
      qulot: {
        httpEndpoint: 'http://localhost:5000/query',
        wsEndpoint: 'ws://localhost:5000/query',
        connectToDevTools: !isProduction,
      },
      '80001': {
        connectToDevTools: !isProduction,
        httpEndpoint: 'http://localhost:8000',
      },
      '137': {
        connectToDevTools: !isProduction,
        httpEndpoint: 'http://localhost:8000',
      },
    },
  },

  build: {
    transpile: isProduction
      ? [
          'tslib',
          '@ethersproject',
          'ethers',
          'cron-parser',
          'luxon',
          'vue-recaptcha',
        ]
      : ['tslib', 'vue-recaptcha'],
  },

  vite: {
    plugins: [nodePolyfills()],
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        verbatimModuleSyntax: false,
      },
    },
  },

  devtools: {
    timeline: {
      enabled: true,
    },
  },
})
