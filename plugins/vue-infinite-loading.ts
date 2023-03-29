import InfiniteLoading from 'vue-infinite-loading'

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(InfiniteLoading)
})
