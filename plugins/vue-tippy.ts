import VueTippy from 'vue-tippy'

// https://vue-tippy.netlify.app/configuration
export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(VueTippy, {
    directive: 'tippy', // => v-tippy
    component: 'tippy', // => <tippy/>
    componentSingleton: 'tippy-singleton', // => <tippy-singleton/>,
    defaultProps: {
      placement: 'auto-end',
      allowHTML: true,
    }, // => Global default options * see all props
  })
})
