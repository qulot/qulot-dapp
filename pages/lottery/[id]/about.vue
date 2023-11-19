<template>
  <div class="relative pt-16 pb-4 lg:pb-10">
    <!-- Introduction Session -->
    <section
      id="introduction"
      class="relative overflow-hidden section-welcome bg-cover bg-no-repeat bg-center bg-[url('/banner/bg-product-top.png')] pt-10"
    >
      <div
        class="container mx-auto relative z-10 h-full flex items-end justify-center pb-10"
      >
        <div
          class="product-info relative flex flex-col lg:flex-row lg:flex-wrap max-w-full bg-cover bg-no-repeat bg-top rounded-xl bg-[#7335C2B2] backdrop-blur-[1.5px]"
        >
          <PageLotteryIntroductionCard v-if="lottery" :lottery="lottery" />
        </div>
      </div>
      <img
        src="/bg/coin-product-left.png"
        alt="coin-product-left"
        class="absolute left-0 bottom-0 w-[150px] lg:w-auto"
      />
      <img
        src="/bg/coin-product-right.png"
        alt="coin-product-right"
        class="absolute right-0 bottom-0 w-[170px] lg:w-auto"
      />
    </section>

    <!-- How To Play Section -->
    <section id="how-to-play">
      <div class="container mx-auto py-4 lg:py-8 lg:px-60">
        <PageLotteryHowToPlaySection
          v-if="lottery"
          :lottery="lottery"
          class="columns-1"
        />
      </div>
    </section>

    <!-- Prize Structure Section -->
    <section>
      <div class="container mx-auto py-4 lg:py-8 lg:px-60">
        <PageLotteryPrizeStructureSection
          v-if="lottery"
          :lottery="lottery"
          class="columns-1"
        />
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'

definePageMeta({
  validate: (route) => {
    return !containsSpecialChars(route.params.id as string)
  },
})

const config = useRuntimeConfig()
const route = useRoute()
const lotteryStore = useLotteryStore()
const { token } = useQulot()
const { isExists, lottery } = storeToRefs(lotteryStore)

await lotteryStore.fetchLotteryById(route.params.id as string)

if (!isExists.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
  })
}

const title = computed(
  () => `${lottery.value?.verboseName} | ${config.public.metadata.appName}`
)

useSeoMeta({
  title,
  ogTitle: title,
  ogImage: lottery.value?.picture,
  twitterCard: 'app',
})
</script>
