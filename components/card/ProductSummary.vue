<template>
  <blockquote
    class="
      flex flex-row-reverse
      items-center
      justify-between
      w-full
      col-span-1
      p-6
      bg-white
      rounded-lg
      shadow
      sm:flex-row
    "
  >
    <div class="flex flex-col">
      <div class="relative">
        <h3 class="text-base font-medium leading-5 text-gray-800 truncate">
          {{ jackpotEstimatedLabel }}
        </h3>
        <h2 class="text-base font-medium text-red-600 text-4xl truncate">
          {{ jackpotEstimatedValue }}
        </h2>
        <p class="text-base text-gray-800 truncate">
          {{ lastDrawResultLabel }}
        </p>

        <div class="flex flex-rows w-full my-2">
          <LuckyNumberItem
            class="mr-2"
            v-for="(num, i) in winningNumbers"
            :key="i"
            :number="num"
          />
        </div>

        <h3
          class="text-base font-medium leading-5 text-gray-800 truncate"
          v-if="hasNextDrawing"
        >
          {{ $t("session.labels.nextDrawing") }}
        </h3>

        <CountDown
          class="w-full my-2"
          v-if="hasNextDrawing"
          :target="nextDrawDatetime"
        />
      </div>
    </div>
    <img
      class="flex-shrink-0 w-32 bg-gray-300 rounded-full"
      :src="product.picture"
      alt=""
    />
  </blockquote>
</template>
<script>
import CountDown from "@/components/datetime/CountDown.vue";
import LotteryProduct from "@/models/lottery/product";
import LuckyNumberItem from "@/components/other/LuckyNumber.vue";
import { formatDateTime, FORMATS, toDateTime } from "@/utils/datetime";
import { formatUSD } from "@/utils/currency";
export default {
  components: {
    CountDown,
    LuckyNumberItem,
  },
  props: {
    product: {
      type: [LotteryProduct, Object],
      require: true,
      default: null,
    },
  },
  computed: {
    /**
     * Verbose jackpot title of the product name
     * @returns
     */
    jackpotEstimatedLabel() {
      return this.$t("product.labels.estimate", {
        name: this.product.verboseName,
      });
    },
    /**
     * Verbose jackpot estimated value of the product
     * @returns
     */
    jackpotEstimatedValue() {
      const jackpot = this.product.nextSessionEstimatedJackpot || 0;
      return formatUSD(jackpot);
    },
    /**
     * Get winings numbers or default empty
     * @returns
     */
    winningNumbers() {
      const winningNumbers = this.product.lastSessionWinningNumbers || [];
      return winningNumbers;
    },
    /**
     * Get last draw result label of the product
     * @results
     */
    lastDrawResultLabel() {
      var productId = "##";
      if (this.product.lastSessionId) {
        productId = this.product.lastSessionId;
      }

      var drawDateTime = "##";
      if (this.product.lastSessionDrawDatetime) {
        drawDateTime = formatDateTime(
          this.product.lastSessionDrawDatetime,
          FORMATS.ddmmyyyy
        );
      }

      return this.$t("session.labels.lastDrawingResult", {
        productId: productId,
        drawDateTime: drawDateTime,
      });
    },
    /**
     * Check product hash next session or not
     * @results
     */
    hasNextDrawing() {
      return this.nextDrawDatetime != null;
    },
    /**
     * Convert next session draw date to date object
     * @results
     */
    nextDrawDatetime() {
      return toDateTime(this.product.nextSessionDrawDatetime);
    },
  },
};
</script>