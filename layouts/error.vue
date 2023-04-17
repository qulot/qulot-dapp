<template>
  <div class="nuxt-error pt-16 pb-4 lg:pb-14">
    <component :is="errorPage" :error="error" />
  </div>
</template>

<script setup lang="ts">
const Error404 = resolveComponent('Error404')
const Error500 = resolveComponent('Error500')

const props = defineProps({
  error: {
    type: Object,
    default: () => {},
  },
})

const errorPage = computed(() => {
  if (props.error.statusCode === 400) {
    return Error404
  }
  // catch everything else
  return Error500
})
</script>
