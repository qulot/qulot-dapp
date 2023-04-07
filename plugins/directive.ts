export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.directive('click-outside', {
    // eslint-disable-next-line
    mounted(el, binding, vnode) {
      el.clickOutsideEvent = function (event: any) {
        if (!(el === event.target || el.contains(event.target))) {
          binding.value(event, el)
        }
      }
      document.body.addEventListener('click', el.clickOutsideEvent)
    },
    unmounted(el) {
      document.body.removeEventListener('click', el.clickOutsideEvent)
    },
  })
})
