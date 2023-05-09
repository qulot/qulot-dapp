<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
const config = useRuntimeConfig()
const { themeCurrent } = useTheme()
const { locale } = useI18n()
const { init: initEthers } = useEthers()
const { init: initQulot } = useQulot()
const { init: initAccount } = useAccount({
  updateOnce: false,
  updateInterval: 20000,
})

useSeoMeta({
  title: config.public.metadata.appName,
  ogTitle: config.public.metadata.appName,
  ogDescription: config.public.metadata.appDescription,
  ogImage: config.public.metadata.appIcon,
  twitterCard: 'app',
})

onMounted(async () => {
  useHead({
    htmlAttrs: {
      class: themeCurrent,
      lang: locale,
    },
  })

  await initEthers()
  await initQulot()
  await initAccount()
})
</script>
