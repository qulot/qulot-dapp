<template>
  <div
    class="border border-dashed border-default rounded-lg p-3 text-sm space-y-3.5 justify-between flex flex-col lg:p-6 lg:flex-row lg:space-y-0 lg:items-center"
  >
    <div>
      <div class="text-[17px] font-bold text-title mb-2 lg:mb-4">
        {{ $t('round.label', { round: roundId, date: roundStartDate }) }}
      </div>
      <div
        class="flex flex-col space-y-2 lg:flex-row lg:space-x-6 lg:space-y-0"
      >
        <div>
          <div class="mb-2 dark:text-white">
            {{ $t('round.winningNumber') }}:
          </div>
          <div v-if="round.winningNumbers" class="flex items-center space-x-2">
            <div v-for="(num, i) in round.winningNumbers" :key="i">
              <BallItem :number="num" />
            </div>
          </div>
        </div>
        <div
          class="flex flex-row items-center space-x-1 lg:flex-col lg:items-start lg:space-y-2"
        >
          <div class="dark:text-white">{{ $t('lottery.jackpot') }}:</div>
          <TokenValue
            :value="round.totalAmount"
            show-symbol
            class="text-2xl font-bold text-title"
            tag="div"
          />
        </div>
      </div>
    </div>
    <div
      class="list-actions w-full grid grid-cols-2 lg:w-auto lg:grid-cols-1 gap-2"
    >
      <Button
        class="rounded border-title text-title bg-transparent hover:text-main hover:bg-transparent hover:border-main"
        @click="$emit('checkTicket')"
      >
        {{ $t('round.checkTicket') }}
      </Button>
      <Button variant="primary" class="rounded text-white">{{
        $t('round.printResult')
      }}</Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { Round } from '~~/types/lottery'

const props = defineProps({
  round: {
    type: Object as PropType<Round>,
    required: true,
  },
})

defineEmits(['checkTicket'])

const roundId = computed(() => {
  let lastRoundId = '0'
  if (props.round) {
    lastRoundId = formatNumber(props.round.id)
  }

  return lastRoundId
})

const roundStartDate = computed(() => {
  let lastRoundDraw = 'NaN'
  if (props.round) {
    lastRoundDraw = formatTimestamp(props.round.startTime, 'mmddyyyy') as string
  }

  return lastRoundDraw
})
</script>
