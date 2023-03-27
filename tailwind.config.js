module.exports = {
  mode: "jit",
  darkMode: 'class',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./formulate.config.{js,ts}",
  ],
  theme: {
    extend: {
      container: {
        padding: '1rem',
        screens: {
          sm: '600px',
          md: '728px',
          lg: '984px',
          xl: '1202px',
          '2xl': '1202px',
        },
      },
      fontFamily: {
        sans: ["Inter", 'Arial', 'sans-serif'],
      },
      colors: {
        "main": "#13CCDF",
        "tech": "#5917AD",
        "line": "#D8D8D8",
        "disable": "#A8A8A8",
        "content": "var(--color-content)",
        "black": "var(--color-black)",
        "label": "var(--color-label)",
        "title": "var(--color-title)",
        "title-nodark": "#1B2847",
        "subtitle": "var(--color-subtitle)",
        "menu": "#BABABA",
        "yellow": '#FFA531',
        "error": "#FF228C"
      },
      borderColor: {
        default: "#D8D8D8"
      },
      backgroundColor: {
        body: "var(--bg-body)",
        gray: "#F5F5F5",
        block: "#241D3A"
      },
      boxShadow: {
        default: '0px 2px 20px rgba(0, 0, 0, 0.1)'
      },
      gridTemplateColumns: {
        '15': 'repeat(16, minmax(0, 1fr))',
      }

    },
  },
  // plugins: [require("daisyui")],
  // daisyui: {
  //   themes: [
  //     "night",
  //     {
  //       light: {
  //         ...require("daisyui/src/colors/themes")["[data-theme=light]"],
  //         "primary": "#13CCDF",
  //         "accent": "#663EE1",
  //         "accent-content": "#ffffff",
  //         'secondary': "#bababa",
  //       },
  //     },
  //   ],
  // },
};
