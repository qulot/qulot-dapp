import DatePicker from 'vue3-datepicker'
export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.component('DatePicker', DatePicker)
})
