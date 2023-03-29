<!-- <template>
  <div class="
          flex flex-col
          lg:flex-row lg:items-center
          space-y-4
          lg:space-y-0
          space-x-0
          lg:space-x-4
          bg-[#F3EFFF]
          dark:bg-block
          rounded-lg
          p-3
          lg:p-3
          xl:p-6
          text-sm
        ">
    <div class="flex items-center gap-x-2 xl:gap-x-6 lg:w-4/12">
      <div class="w-20 h-20 xl:w-32 xl:h-32 flex items-center">
        <img :src="product.picture" alt="" />
      </div>
      <div class="flex-grow space-y-1">
        <h2 class="text-[17px] font-bold text-black">{{ productName }}</h2>
        <p class="text-sm">{{ $t('product.labels.estimate') }}</p>
        <p class="text-[#6135E9] text-2xl font-bold md:text-3xl">
          {{ jackpotEstimatedValue }}
        </p>
      </div>
    </div>
    <div class="flex !mr-auto flex-col justify-center lg:w-3/12 xl:w-4/12">
      <p class="text-xs mb-2 md:mb-4 md:text-sm" v-html="resultLabel"></p>
      <div class="flex items-center gap-x-1">
        <div class="mr-2" v-for="(num, i) in winningNumbers" :key="i">
          <CircleItem :number="num" />
        </div>
      </div>
    </div>
    <div class="flex flex-col justify-center xl:items-center xl:flex-row xl:gap-x-6">
      <div class="flex flex-col justify-center h-full flex-grow">
        <p>{{ $t('product.labels.nextDrawing') }}</p>
        <div>
          <CountDown2 class="w-full my-2" v-if="hasNextDrawing" :target="nextDrawDatetime" />
        </div>
      </div>
    </div>
    <div>
      <BButton type="text" :isLoading="loading" variant="primary" class="font-bold rounded !justify-between !text-white"
        @click="$router.push(`/product/${product.id}`)">
        <span>{{ $t('product.labels.playNow') }}</span>
        <svg-icon name="arrow-right-circle" class="w-4 h-4" />
      </BButton>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { formatDateTime, FORMATS, toDateTime } from '@/utils/datetime'
import { formatUSD } from '@/utils/currency'

export default {
  components: {
    CircleItem: () => import('@/components/circle/CircleItem.vue'),
    CountDown2: () => import('@/components/datetime/CountDown2.vue'),
    BButton: () => import('@/components/button/BButton.vue'),
  },
  props: {
    product: {
      type: [Object],
      require: true,
      default: null,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    timeLabel() {
      return moment(this.product.lastSessionDrawDatetime).format(FORMATS.ddmmyyyy)
    },
    resultLabel() {
      return this.$t('product.labels.result', {
        id: '#' + this.$options.filters.sessionId(this.product.lastSessionId),
        date: this.timeLabel,
      })
    },
    productName() {
      return `${this.product.verboseName} Jackpot ${this.product.numberOfItems || 0}/${this.product.maxValuePerItem || 0
        }`
    },
    /**
     * Verbose jackpot estimated value of the product
     * @returns
     */
    jackpotEstimatedValue() {
      const jackpot = this.product.nextSessionEstimatedJackpot || 0
      return formatUSD(jackpot)
    },
    /**
     * Get winings numbers or default empty
     * @returns
     */
    winningNumbers() {
      const winningNumbers = this.product.lastSessionWinningNumbers || []
      return winningNumbers
    },
    /**
     * Get last draw result label of the product
     * @results
     */
    lastDrawResultLabel() {
      let productId = '##'
      if (this.product.lastSessionId) {
        productId = this.product.lastSessionId
      }

      let drawDateTime = '##'
      if (this.product.lastSessionDrawDatetime) {
        drawDateTime = formatDateTime(this.product.lastSessionDrawDatetime, FORMATS.ddmmyyyy)
      }

      return this.$t('session.labels.lastDrawingResult', {
        productId: productId,
        drawDateTime: drawDateTime,
      })
    },
    /**
     * Check product hash next session or not
     * @results
     */
    hasNextDrawing() {
      return this.nextDrawDatetime != null
    },
    /**
     * Convert next session draw date to date object
     * @results
     */
    nextDrawDatetime() {
      return toDateTime(this.product.nextSessionDrawDatetime)
    },
  },
}
</script> -->
