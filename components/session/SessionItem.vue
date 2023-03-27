<template>
  <div
    class="
      border border-dashed border-default
      rounded-lg
      p-3
      text-sm
      space-y-3.5
      justify-between
      flex flex-col
      lg:p-6 lg:flex-row lg:space-y-0 lg:items-center
    "
  >
    <div>
      <div class="text-[17px] font-bold text-title mb-2 lg:mb-4">
        {{ labelSession }}
      </div>
      <div class="flex flex-col space-y-2 lg:flex-row lg:space-x-6 lg:space-y-0">
        <div>
          <div class="mb-2">{{ $t('session.labels.drawingResult') }}:</div>
          <div class="flex items-center space-x-2">
            <div v-for="(num, i) in dataSession.winningNumbers" :key="i">
              <circle-item :number="num" />
            </div>
          </div>
        </div>
        <div class="flex flex-row items-center space-x-1 lg:flex-col lg:items-start lg:space-y-2">
          <div>Jackpot:</div>
          <div class="text-2xl font-bold text-title">{{ jackpotActualValue }}</div>
        </div>
      </div>
    </div>
    <div class="list-actions w-full grid grid-cols-2 lg:w-auto lg:grid-cols-1 gap-2">
      <BButton
        class="rounded border-title text-title bg-transparent hover:text-main hover:bg-transparent hover:border-main"
        @click="
          $modal.show('find-number', {
            maxValuePerItem,
            numberOfItems,
            winningNumbers: dataSession.winningNumbers,
            lotteryProductId: dataSession.productId,
            lotterySessionId: dataSession.id,
          })
        "
      >
        {{ $t('session.labels.findNumber') }}
      </BButton>
      <BButton variant="primary" class="rounded text-white">{{ $t('session.labels.printResult') }}</BButton>
    </div>
  </div>
</template>

<script>
import LotterySession from '@/models/lottery/session'
import { formatDateTime, FORMATS } from '@/utils/datetime'
import { formatUSD } from '@/utils/currency'

export default {
  name: 'SessionItem',
  components: {
    BButton: () => import('@/components/button/BButton.vue'),
    CircleItem: () => import('@/components/circle/CircleItem.vue'),
  },
  props: {
    dataSession: {
      type: [LotterySession, Object],
      require: true,
      default: () => {},
    },
    maxValuePerItem: {
      type: Number,
      default: 0,
    },
    numberOfItems: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      ticket: [],
    }
  },
  computed: {
    labelTime() {
      return formatDateTime(this.dataSession.drawDatetime, FORMATS.ddmmyyyy)
    },
    labelSession() {
      return this.$t('session.labels.labelSession', {
        sessionId: this.$options.filters.sessionId(this.dataSession.id),
        drawDatetime: this.labelTime,
      })
    },
    jackpotActualValue() {
      const jackpot = this.dataSession.actualJackpot || 0
      return formatUSD(jackpot)
    },
  },
}
</script>
