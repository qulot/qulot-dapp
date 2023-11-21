<template>
  <NuxtLayout>
    <!-- Nuxt Loading Indicator -->
    <NuxtLoadingIndicator />

    <!-- Nuxt Page -->
    <NuxtPage />

    <!-- Modals -->
    <ModalsContainer />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { useRecaptchaProvider } from 'vue-recaptcha'
import { ModalsContainer } from 'vue-final-modal'

const config = useRuntimeConfig()
const { themeCurrent } = useTheme()
const { t, locale } = useI18n()
const { init: initEthers } = useEthers()
const { init: initQulot } = useQulot()
const { init: initAccount } = useAccount({
  updateOnce: false,
  updateInterval: 20000,
})

useRecaptchaProvider()
const authStore = useAuthStore()
const lotteryStore = useLotteryStore()
const paymentStore = usePaymentStore()
const cartStore = useCartStore()

useSeoMeta({
  title: `${config.public.metadata.appName} - ${t('app.title')}`,
  ogTitle: `${config.public.metadata.appName} - ${t('app.title')}`,
  ogDescription: t('app.description'),
  description: t('app.description'),
  ogImage: config.public.metadata.appIcon,
  twitterCard: 'summary',
})

useHead({
  htmlAttrs: {
    lang: locale,
    class: themeCurrent,
  },
  meta: [
    { name: 'adsense-account', content: config.public.google.adsenseAccount },
  ],
})

// SSR load list lotteries on server
await lotteryStore.fetchLotteries()

onBeforeMount(() => {
  authStore.loadLocalStorage()
})
// Load data on client
onMounted(async () => {
  await initEthers()
  await initQulot()
  await initAccount()

  await paymentStore.fetchQulotPaymentMethods()
  await authStore.fetchLoggedInUser()
  cartStore.loadLocalStorage()
})
</script>
