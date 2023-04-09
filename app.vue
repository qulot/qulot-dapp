<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
const { themeCurrent } = useTheme()
const { locale } = useI18n()

onMounted(() => {
  useHead({
    htmlAttrs: {
      class: themeCurrent,
      lang: locale
    }
  })
})
</script>
