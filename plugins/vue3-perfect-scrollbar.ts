import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.component('PerfectScrollbar', PerfectScrollbar)
})
