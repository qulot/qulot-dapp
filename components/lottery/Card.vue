<template>
  <div
    class="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 space-x-0 lg:space-x-4 bg-[#F3EFFF] dark:bg-block rounded-lg p-3 lg:p-3 xl:p-6 text-sm"
  >
    <div class="flex items-center gap-x-2 xl:gap-x-6 lg:w-4/12">
      <!-- Lottery Picture -->
      <img
        class="w-20 h-20 xl:w-32 xl:h-32 rounded"
        :src="lottery.picture"
        alt=""
      />

      <!-- Lottery Info -->
      <div class="flex-grow space-y-1">
        <h2 class="text-[17px] font-bold text-black">{{ productName }}</h2>
        <p class="text-sm text-black">{{ $t('lottery.lotteryJackpot') }}</p>
        <TokenValue
          :value="props.lottery?.nextRound?.totalAmount"
          :fixed="0"
          show-symbol
          use-fiat-value
          hide-subunits
          tag="p"
          class="text-[#6135E9] text-2xl font-bold md:text-3xl"
        />
      </div>
    </div>
    <div class="flex !mr-auto flex-col justify-center lg:w-3/12 xl:w-4/12">
      <!-- Last Round Win Numbers -->
      <p class="text-xs mb-2 md:mb-4 md:text-sm text-black">
        {{ $t('round.label', { round: lastRoundId, date: lastRoundDate }) }}
      </p>
      <div class="flex items-center gap-x-1">
        <div v-for="(num, i) in winningNumbers" :key="i" class="mr-2">
          <BallItem :number="num" />
        </div>
      </div>
    </div>
    <div
      class="flex flex-col justify-center xl:items-center xl:flex-row xl:gap-x-6"
    >
      <!-- Next Round Info -->
      <div class="flex flex-col justify-center h-full flex-grow">
        <p class="text-black">{{ $t('round.nextRoundCloseTime') }}</p>
        <DatetimeCountDown2
          v-if="lottery.nextTickClose"
          class="w-full my-2"
          :target="lottery.nextTickClose"
        />
      </div>
    </div>
    <div>
      <Button
        type="button"
        :is-loading="loading"
        variant="primary"
        rounded
        class="font-bold !justify-between !text-white gap-2"
        @click="
          $router.push(
            localePath({ name: 'lottery-id', params: { id: lottery.id } })
          )
        "
      >
        <span>{{ $t('lottery.playNow') }}</span>
        <svg-icon name="arrow-right-circle" class="w-4 h-4" />
      </Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Lottery } from '~~/types/lottery'

const props = defineProps<{ lottery: Lottery }>()
const localePath = useLocalePath()

const loading = ref(false)

const lastRoundId = computed(() => {
  let lastRoundId = '0'
  if (props.lottery.lastRound) {
    lastRoundId = formatNumber(props.lottery.lastRound.id)
  }

  return lastRoundId
})

const lastRoundDate = computed(() => {
  let lastRoundDraw = 'NaN'
  if (props.lottery.lastRound) {
    lastRoundDraw = formatTimestamp(
      props.lottery.lastRound.startTime,
      'mmddyyyy'
    ) as string
  }

  return lastRoundDraw
})

const productName = computed(() => {
  const verboseName = props.lottery.verboseName
  const numberOfItems = props.lottery.numberOfItems || 0
  const maxValuePerItem = props.lottery.maxValuePerItem || 0
  return `${verboseName} Jackpot ${numberOfItems || 0}/${maxValuePerItem || 0}`
})

const winningNumbers = computed(() => {
  const winningNumbers =
    props.lottery?.lastRound?.winningNumbers ||
    Array.from({ length: props.lottery.numberOfItems }, () => 0)
  return winningNumbers
})
</script>
