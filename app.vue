<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
const { themeCurrent } = useTheme()
const { locale } = useI18n()
const { init: initEthers } = useEthers()
const { init: initQulot } = useQulot()
const { init: initAccount } = useAccount({ updateOnce: false, updateInterval: 20000 })

onMounted(async () => {
  useHead({
    htmlAttrs: {
      class: themeCurrent,
      lang: locale,
    },
  })

  await Promise.all([initEthers(), initQulot(), initAccount()])
})
</script>
