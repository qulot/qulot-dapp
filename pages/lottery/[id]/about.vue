<template>
  <div class="relative pt-16 pb-4 lg:pb-10">
    <!-- Introduction Session -->
    <section
      id="introduction"
      class="relative overflow-hidden section-welcome bg-cover bg-no-repeat bg-center bg-[url('/banner/bg-product-top.png')] pt-20"
    >
      <div
        class="container mx-auto relative z-10 h-full flex items-end justify-center pb-10"
      >
        <div
          class="product-info relative flex flex-col lg:flex-row lg:flex-wrap max-w-full bg-cover bg-no-repeat bg-top rounded-xl bg-[#7335C2B2] backdrop-blur-[1.5px]"
        >
          <div
            class="relative p-5 w-[361px] lg:w-[450px] text-center text-white leading-tight"
          >
            <div class="w-full flex flex-col space-y-4">
              <img
                :src="lottery?.picture"
                :alt="lottery?.verboseName"
                class="max-w-[15rem] h-auto mx-auto"
              />
              <i18n-t
                tag="p"
                keypath="lotteryAbout.introduction"
                class="text-white"
              >
                <template #ticketPrice>
                  <span class="font-bold">
                    {{ ticketPrice }}
                    <span class="text-xs">{{ token?.symbol }}</span>
                  </span>
                </template>
                <template #pickNumbers>
                  <span class="font-bold">
                    {{ lottery?.numberOfItems }}
                    {{ $t('lotteryAbout.numberFrom') }}
                    {{ lottery?.minValuePerItem }}/{{
                      lottery?.maxValuePerItem
                    }}
                  </span>
                </template>
                <template #jackpot>
                  <span class="font-bold">
                    {{ $t('lotteryAbout.jackpotFrom') }}
                    {{ jackpotPrice }}
                    <span class="text-xs">{{ token?.symbol }}</span>
                  </span>
                </template>
                <template #name>
                  <span class="font-bold">
                    {{ lottery?.verboseName }}
                    {{ lottery?.minValuePerItem }}/{{
                      lottery?.maxValuePerItem
                    }}
                  </span>
                </template>
                <template #drawTime>
                  <span class="font-bold">
                    {{ hourUtcToLocal(lottery?.periodHourOfDays || 0) }}h00
                  </span>
                </template>
                <template #drawDate>
                  <span class="font-bold">
                    <template v-if="!isEveryDay(lottery?.periodDays)">
                      {{ $t('lotteryAbout.every') }}
                      {{
                        lottery?.periodDays
                          .map((periodDay) => $t('days.' + periodDay))
                          .join(', ')
                      }}
                    </template>
                    <template v-else>
                      {{ $t('days.everyday') }}
                    </template>
                    {{ $t('lotteryAbout.weekly') }}
                  </span>
                </template>
              </i18n-t>
            </div>
            <img
              src="/bg/coin-productinfo-small.svg"
              alt="coin-productinfo-small"
              class="absolute -left-[20px] bottom-[15px]"
            />
            <img
              src="/bg/coin-productinfo-big.svg"
              alt="coin-productinfo-big"
              class="absolute -right-[30px] top-[15px]"
            />
          </div>
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
        <div class="columns-1 space-y-4">
          <h1
            class="uppercase font-bold text-title-nodark dark:text-white text-center"
          >
            {{ $t('lottery.howToPlay') }}
          </h1>
          <p class="text-content dark:text-white space-y-4">
            {{
              $t('lotteryAbout.howToPlayPickNumber', {
                minNumber: lottery?.minValuePerItem,
                maxNumber: lottery?.maxValuePerItem,
                numberOfItems: lottery?.numberOfItems,
              })
            }}
          </p>
          <p class="text-content dark:text-white space-y-4">
            <i18n-t tag="p" keypath="lotteryAbout.howToPlayPrice">
              <template #ticketPrice>
                <span class="font-bold">
                  {{ ticketPrice }}
                  <span class="text-xs">{{ token?.symbol }}</span>
                </span>
              </template>
            </i18n-t>
          </p>
        </div>
      </div>
    </section>

    <!-- Prize Structure Section -->
    <section>
      <div class="container mx-auto py-4 lg:py-8 lg:px-60">
        <div class="columns-1 space-y-4">
          <h1
            class="uppercase font-bold text-title-nodark dark:text-white text-center"
          >
            {{ $t('lotteryAbout.prizeStructure') }}
          </h1>

          <p class="text-content dark:text-white space-y-4">
            {{
              $t('lotteryAbout.howToPlayFinalPrize', {
                treasuryFee: lottery?.treasuryFeePercent,
                amountInjectNextRoundFee: lottery?.amountInjectNextRoundPercent,
              })
            }}
          </p>

          <p class="text-content dark:text-white space-y-4">
            {{ $t('lotteryAbout.howToPlayMatchWiningNumbers') }}
          </p>
          <div
            v-if="lottery?.rewardRules"
            class="grid grid-flow-col auto-cols-auto gap-2 lg:gap-4"
          >
            <RewardRuleItem
              v-for="rewardRule in lottery.rewardRules"
              :key="rewardRule.matchNumber"
              :rule="rewardRule"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { BigNumber } from 'ethers'
import { formatUnits } from 'ethers/lib/utils.js'
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

const ticketPrice = computed(() =>
  formatUnits(lottery.value?.pricePerTicket || '0', token.value?.decimals)
)

const jackpotPrice = computed(() => {
  let jackpot = '1000'
  if (
    lottery.value &&
    lottery.value.nextRound &&
    BigNumber.from(lottery.value.nextRound.totalAmount).gt(
      BigNumber.from('0')
    ) &&
    token.value
  ) {
    jackpot = formatUnits(
      lottery.value.nextRound.totalAmount,
      token.value.decimals
    )
  }
  return jackpot
})
</script>
