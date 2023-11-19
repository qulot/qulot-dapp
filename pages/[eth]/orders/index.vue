<template>
  <div class="container mx-auto pt-24 pb-4 lg:pb-14 lg:px-20">
    <h1 class="text-[24px] font-bold text-title mb-4">
      {{ $t('order.header') }}
    </h1>
    <div class="space-y-4">
      <!-- Order list -->
      <OrderCard
        v-for="order in orders"
        :key="order.id"
        :order="order"
        :is-expand="$route.query.order === order.id"
        :is-loading-ticket="orderTickets[order.id]?.isLoading"
        :order-tickets="orderTickets[order.id]?.tickets"
        @expand="handleOrderLoadTickets"
        @claim-tickets="handleClaimTickets"
      />
      <!-- Order loading placeholder -->
      <OrderSkeleton v-show="isLoading" />

      <!-- Order load more -->
      <div class="w-full flex justify-center">
        <!-- Order is empty -->
        <OrderEmpty v-if="isComplete && orders.length === 0" />

        <!-- Order load more button -->
        <Button
          v-else
          variant="primary"
          rounded
          :is-loading="isLoading"
          @click="loadMore"
        >
          {{ $t('labels.loadMore') }}
        </Button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { BigNumber, utils } from 'ethers'

const route = useRoute()
const { t } = useI18n()
const config = useRuntimeConfig()
const orderStore = useOrderStore()
const ticketStore = useTicketStore()
const { orders, orderTickets, isLoading, isComplete } = storeToRefs(orderStore)

const title = computed(
  () => `${t('order.header')} | ${config.public.metadata.appName}`
)

useSeoMeta({
  title,
  ogTitle: title,
})

definePageMeta({
  validate: (route) => {
    return utils.isAddress(route.params.eth)
  },
})

const loadMore = async () => {
  await orderStore.fetchUserOrders(route.params.eth.toLowerCase())
}

const firstLoad = async () => {
  await loadMore()
}

const handleOrderLoadTickets = async (orderId: string, isShow: boolean) => {
  if (isShow) {
    await orderStore.fetchOrderTickets(orderId)
  } else {
    orderStore.nextPage()
    orderStore.cleanOrderTickets(orderId)
  }
}

const handleClaimTickets = async (orderId: string, ticketIds: BigNumber[]) => {
  const ok = await ticketStore.claimTickets(ticketIds)
  if (ok) {
    await orderStore.fetchOrderTickets(orderId)
  }
}

onMounted(async () => {
  await firstLoad()
})

onUnmounted(() => {
  orderStore.clear()
})
</script>
