export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Qulot - Lottery project using cryptocurrency",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/svg", href: "/logo-icon.svg" }],
    script: [
      {
        type: "module",
        src: "https://unpkg.com/ionicons@5.0.0/dist/ionicons/ionicons.esm.js",
      },
    ],
    bodyAttrs: {
      class: 'text-content antialiased',
    },
  },

  ssr: true,
  target: "server",

  // https://nuxtjs.org/docs/configuration-glossary/configuration-env/
  env: {
    // googleClientId: process.env.GOOGLE_CLIENT_ID,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/css/tailwind.scss", "~/assets/css/transition.css",],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/directive.client.js" },
    { src: "~/plugins/filters.js" },
    { src: "~/plugins/inject-const.js" },
    { src: "~/plugins/vue-formulate.js" },
    { src: "~/plugins/repositories.js" },
    { src: "~/plugins/phone-input.js" },
    { src: "~/plugins/vue-js-modal.js", ssr: false },
    { src: '~/plugins/vue-infinite-loading.js', ssr: false },
    { src: '~/plugins/vue-perfect-scrollbar.js', ssr: false },
    { src: '~/plugins/vue-datepicker.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/google-fonts", "@nuxtjs/svg-sprite", "@nuxt/postcss8", "@braid/vue-formulate/nuxt"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/i18n",
    "@nuxtjs/axios",
    "cookie-universal-nuxt",
  ],

  i18n: {
    langDir: "locales/",
    defaultLocale: "en",
    strategy: "no_prefix",
    locales: [
      { code: "en", iso: "en-US", name: "English", file: "en-US.js" },
      { code: "vi", iso: "vi-VN", name: "Tiếng Việt", file: "vi-VN.js" },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n",
      alwaysRedirect: true,
      redirectOn: "root",
    },
    vueI18n: {
      fallbackLocale: "en",
      silentTranslationWarn: true
    },
  },

  // https://auth.nuxtjs.org/guide/middleware
  router: {
    middleware: [],
  },

  // https://nuxtjs.org/docs/configuration-glossary/configuration-servermiddleware/
  serverMiddleware: ['~/server-middleware/healthcheck.js'],

  // https://storybook.nuxtjs.org/getting-started
  storybook: {
    addons: ["@storybook/addon-console"],
    parameters: {
      layout: "centered",
      backgrounds: {
        default: 'white',
        values: [
          { name: 'white', value: '#ffffff' }
        ],
      },
    },
    modules: {
      exclude: ["svg-sprite"],
    },
  },

  /**
   * Temporary workaround for @nuxt-community/tailwindcss-module.
   *
   * Reported: 2022-05-23
   * See: [Issue tracker](https://github.com/nuxt-community/tailwindcss-module/issues/480)
   */
  devServerHandlers: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      'defu'
    ],
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },

  googleFonts: {
    download: true,
    families: {
      Inter: [400, 500, 700],
    },
  },

  watchers: {
    // Temporary fix: https://github.com/nuxt-community/tailwindcss-module/issues/359
    webpack: {
      ignored: ["**/*.eslintcache", "**/.git/**"],
    },
  }
}
