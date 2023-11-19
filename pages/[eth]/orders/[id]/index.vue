<template>
  <div class="container mx-auto pt-24 pb-4 lg:pb-14 lg:px-20">
    <h1 class="text-[24px] font-bold text-title mb-4">
      {{ $t('order.detailHeader') }}
    </h1>
    <div class="space-y-4">
      <OrderSkeleton v-show="isLoading" />
      <OrderCard
        v-if="orders.length && orders[0] && orderTickets[orders[0].id]"
        :key="orders[0].id"
        :order="orders[0]"
        :is-loading-ticket="orderTickets[orders[0].id]?.isLoading"
        :order-tickets="orderTickets[orders[0].id]?.tickets"
        is-expand
        @claim-tickets="handleClaimTickets"
      />
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
const { orders, orderTickets, isLoading } = storeToRefs(orderStore)

const title = computed(() => {
  let title = `${t('order.detailHeader')} | ${config.public.metadata.appName}`
  if (orders.value && orders.value.length) {
    title = t('order.no', { order: orders.value[0].id })
  }
  return `${title} | ${config.public.metadata.appName}`
})

useSeoMeta({
  title,
  ogTitle: title,
})

definePageMeta({
  validate: (route) => {
    return utils.isAddress(route.params.eth) && isNumeric(route.params.id)
  },
})

const handleClaimTickets = async (orderId: string, ticketIds: BigNumber[]) => {
  const ok = await ticketStore.claimTickets(ticketIds)
  if (ok) {
    await orderStore.fetchOrderTickets(orderId)
  }
}

onMounted(async () => {
  await orderStore.fetchUserOrder(
    route.params.eth.toLowerCase(),
    route.params.id
  )

  if (orders.value.length === 0) {
    showError({ message: 'Page not found', statusCode: 404 })
    return
  }

  await orderStore.fetchOrderTickets(route.params.id)
})

onUnmounted(() => {
  orderStore.clear()
})
</script>
