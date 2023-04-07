import { Carousel, Slide, Pagination } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.component('Carousel', Carousel)
  vueApp.component('Slide', Slide)
  vueApp.component('Pagination', Pagination)
})
