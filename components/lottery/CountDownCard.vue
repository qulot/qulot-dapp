<template>
  <section
    v-if="lottery"
    class="relative overflow-hidden section-welcome bg-cover bg-no-repeat bg-center bg-[url('/banner/bg-product-top.png')] pt-20"
  >
    <div
      class="container mx-auto relative z-10 h-full flex items-end justify-center pb-10"
    >
      <div
        class="product-info relative flex flex-col lg:flex-row lg:flex-wrap max-w-full bg-cover bg-no-repeat bg-top rounded-xl bg-[url('/banner/bg-product-info.png')]"
      >
        <div
          class="producttop__info relative pt-5 pb-6 min-w-[345px] text-center text-white leading-tight"
        >
          <p class="text-lg mb-1 leading-tight">Lottery Jackpot</p>
          <div class="text-[40px] font-bold text-main mb-1.5 tracking-[0.02em]">
            {{ jackpotEstimatedValue }}
          </div>
          <div class="flex justify-center mb-3">
            <DatetimeCountDown
              v-if="nextRoundDraw"
              class="!text-white"
              :target="nextRoundDraw"
            />
          </div>
          <div class="space-x-2">
            <Button variant="warning" class="rounded text-white">
              Assets
            </Button>
            <Button variant="primary" class="rounded text-white">{{
              $t('ticket.labels.buyTicket', { price: usdPricePerTicket })
            }}</Button>
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
</template>
<script setup lang="ts">
import { formatEther } from '@ethersproject/units'
import { PropType } from 'vue'
import { Lottery } from '~~/types/lottery'

const props = defineProps({
  lottery: {
    type: Object as PropType<Lottery>,
    default: () => null,
  },
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

const nextRoundDraw = computed(() => {
  return props.lottery?.nextTick
})

const usdPricePerTicket = computed(() => {
  if (props.lottery && props.lottery.pricePerTicket) {
    return formatEther(props.lottery.pricePerTicket)
  }
})
</script>
<style lang="scss" scoped>
.product-info::before,
.product-info::after {
  content: '';
  position: absolute;
  z-index: 1;
  width: calc(100% - 12px);
  height: 1px;
  left: 6px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    #ffffff 56%,
    rgba(255, 255, 255, 0) 100%
  );
}
.product-info::before {
  top: 0;
}
.product-info::after {
  bottom: 0;
}
</style>
