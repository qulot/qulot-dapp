<template>
  <div class="relative p-5 w-[361px] lg:w-[450px] text-center leading-tight">
    <div class="w-full flex flex-col space-y-4">
      <img
        :src="lottery?.picture"
        :alt="lottery?.verboseName"
        class="max-w-[8rem] h-auto mx-auto rounded"
      />
      <i18n-t tag="p" keypath="lotteryAbout.introduction" class="text-white">
        <template #ticketPrice>
          <TokenValue :value="lottery?.pricePerTicket" tag="span" show-symbol />
        </template>
        <template #pickNumbers>
          <span class="font-bold">
            {{ lottery?.numberOfItems }}
            {{ $t('lotteryAbout.numberFrom') }}
            {{ lottery?.minValuePerItem }} -
            {{ lottery?.maxValuePerItem }}
          </span>
        </template>
        <template #jackpot>
          {{ $t('lotteryAbout.jackpotFrom') }}
          <TokenValue :value="jackpotPrice" tag="span" show-symbol />
        </template>
        <template #name>
          <span class="font-bold">
            {{ lottery?.verboseName }}
            {{ lottery?.numberOfItems }}/{{ lottery?.maxValuePerItem }}
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
</template>
<script lang="ts" setup>
import { Lottery } from '~/types/lottery'

const props = defineProps({
  lottery: {
    type: Object as PropType<Lottery>,
    required: true,
  },
})

const jackpotPrice = computed(() => {
  const jackpot = '1000'
  if (
    props.lottery &&
    props.lottery.nextRound &&
    props.lottery.nextRound.totalAmount
  ) {
    return props.lottery.nextRound.totalAmount
  }
  return jackpot
})
</script>
