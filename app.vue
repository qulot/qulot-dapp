<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
const { themeCurrent } = useTheme()
const { locale } = useI18n()
const { init } = useEthers()

onMounted(() => {
  init()
  
  useHead({
    htmlAttrs: {
      class: themeCurrent,
      lang: locale,
    },
  })
})
</script>
