import { createVfm } from 'vue-final-modal'
export default defineNuxtPlugin(({ vueApp }) => {
  const vfm = createVfm()
  vueApp.use(vfm)
})
