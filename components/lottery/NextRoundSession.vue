<template>
  <div v-if="lottery" class="bg-[#F3EFFF] dark:bg-block relative">
    <div
      class="container mx-auto py-4 lg:py-6"
      :class="{ 'opacity-30': !nextRoundIsOpen }"
    >
      <div
        class="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:items-center lg:justify-between"
      >
        <div class="flex items-center space-x-3 lg:space-x-6">
          <img
            :src="lottery.picture"
            alt="Next round"
            class="w-20 lg:w-[140px] rounded overflow-hidden h-auto"
          />
          <div class="flex-grow space-y-1">
            <p
              class="text-[17px] mb-1 lg:mb-3 lg:text-[28px] text-title"
              v-html="
                $t('round.nextRound', {
                  roundId: nextRoundId,
                  date: nextRoundDraw,
                })
              "
            ></p>
            <p
              class="flex items-center lg:flex-col lg:items-start space-x-2 lg:space-x-0 lg:space-y-2"
            >
              <span class="text-[13px] lg:text-[17px] text-content">{{
                $t('lottery.jackpot')
              }}</span>
              <TokenValue
                :value="lottery.nextRound?.totalAmount"
                show-symbol
                use-fiat-value
                hide-subunits
                class="text-yellow text-2xl font-bold"
              />
            </p>
          </div>
        </div>
        <div class="w-full grid grid-cols-2 lg:w-auto lg:grid-cols-1 gap-2">
          <Button
            class="rounded border-title text-title bg-transparent hover:text-main hover:bg-transparent hover:border-main"
            :disabled="true"
          >
            {{ $t('round.notification') }}
          </Button>
          <Button
            variant="primary"
            class="rounded text-white"
            :disabled="!nextRoundIsOpen"
            @click="scrollToOrder"
            >{{ $t('cart.buyNow') }}</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
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
  if (props.lottery?.nextTickClose) {
    return formatDateTime(props.lottery.nextTickClose.toISOString(), 'mmddyyyy')
  }
})

const nextRoundIsOpen = computed(() => {
  return props.lottery.nextRound?.status === 'Open'
})

const scrollToOrder = () => {
  document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })
}
</script>
