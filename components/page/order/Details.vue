<template>
  <div class="rounded-lg shadow-default p-2 lg:p-4 space-y-2 dark:bg-block">
    <h4 class="font-bold text-title">{{ $t('order.detail') }}</h4>

    <!-- Order status -->
    <OrderStatus :status="order.status" show-icon class="max-w-fit" />

    <!-- Order subtotal -->
    <div class="flex items-center justify-between text-content">
      <h5>{{ $t('order.detailSubtotal') }}</h5>
      <FiatValue :value="order.totalAmount" :currency="order.currency" />
    </div>

    <!-- Order service fee -->
    <div class="flex items-center justify-between text-content">
      <h5>{{ $t('order.detailServiceFee') }}</h5>
      <FiatValue :value="order.feeAmount" :currency="order.currency" />
    </div>

    <!-- Order total -->
    <div class="flex items-center justify-between text-content">
      <h5>{{ $t('order.detailTotal') }}</h5>
      <FiatValue :value="order.totalPayAmount" :currency="order.currency" />
    </div>

    <!-- Order buyer address -->
    <div class="flex items-center justify-between text-content">
      <h5>{{ $t('order.buyerEthAddress') }}</h5>
      <span>
        {{ shortEthAddress(order.ethBuyerAddr as string) }}
      </span>
    </div>

    <!-- Order network -->
    <div
      v-if="orderChain"
      class="flex items-center justify-between text-content"
    >
      <h5>{{ $t('order.detailNetwork') }}</h5>
      <EthChain :chain="orderChain" :rounded="false" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { QulotOrder } from '~~/types/order'
const props = defineProps({
  order: {
    type: Object as PropType<QulotOrder>,
    required: true,
  },
})

const { getChain } = useEthers()

const orderChain = computed(() => getChain(props.order.ethChainId))
</script>
