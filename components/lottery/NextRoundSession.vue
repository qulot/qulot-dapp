<template>
  <div v-if="lottery" class="bg-[#F3EFFF] dark:bg-block">
    <div class="container mx-auto py-4 lg:py-6">
      <div
        class="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:items-center lg:justify-between"
      >
        <div class="flex items-center space-x-3 lg:space-x-6">
          <img
            :src="lottery.picture"
            alt="next session"
            class="w-20 lg:w-[140px] h-auto"
          />
          <div class="flex-grow space-y-1">
            <p class="text-[17px] mb-1 lg:mb-3 lg:text-[28px] text-title">
              <span>{{ $t('product.labels.nextSession') }}</span>
              <span class="font-bold">#{{ nextRoundId }}</span>
              <span>{{ $t('product.labels.dateText') }}</span>
              <span class="font-bold">{{ nextRoundDraw }}</span>
            </p>
            <p
              class="flex items-center lg:flex-col lg:items-start space-x-2 lg:space-x-0 lg:space-y-2"
            >
              <span class="text-[13px] lg:text-[17px]">Jackpot</span>
              <span class="text-yellow text-2xl font-bold">{{
                jackpotEstimatedValue
              }}</span>
            </p>
          </div>
        </div>
        <div class="w-full grid grid-cols-2 lg:w-auto lg:grid-cols-1 gap-2">
          <Button
            class="rounded border-title text-title bg-transparent hover:text-main hover:bg-transparent hover:border-main"
          >
            {{ $t('session.labels.notification') }}
          </Button>
          <Button
            variant="primary"
            class="rounded text-white"
            @click="scrollToOrder"
            >{{ $t('product.labels.orderNow') }}</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { formatEther } from '@ethersproject/units'
import { Lottery } from '~~/types/lottery'

const props = defineProps({
  lottery: {
    type: Object as PropType<Lottery>,
    default: () => null,
  },
})

const nextRoundId = computed(() => {
  if (props.lottery && props.lottery.nextRound) {
    return formatNumber(props.lottery.nextRound.id)
  }
})

const nextRoundDraw = computed(() => {
  if (props.lottery?.nextTick) {
    return formatDateTime(props.lottery.nextTick.toISOString(), 'ddmmyyyy')
  }
})

const jackpotEstimatedValue = computed(() => {
  if (
    props.lottery &&
    props.lottery.nextRound &&
    props.lottery.nextRound.totalAmount
  ) {
    return formatEther(props.lottery.nextRound.totalAmount)
  }
})

const scrollToOrder = () => {
  document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })
}
</script>
