<template>
  <div class="container mx-auto pt-24 pb-4 lg:pb-14 lg:px-20">
    <PageOrderTitle v-if="order" :order="order" />
    <PageOrderTitleSkeleton v-else />

    <div class="space-y-4">
      <PageOrderDetails v-if="order" :order="order" />
      <PageOrderDetailsSkeleton v-else />

      <PageOrderPaymentDetails v-if="order" :order-payment="orderPayment" />
      <PageOrderPaymentDetailsSkeleton v-else />

      <template v-if="order">
        <PageOrderLineDetails
          v-for="orderLine in order.lines"
          :key="orderLine.id"
          :order="order"
          :order-line="orderLine"
        />
      </template>
      <PageOrderLineDetailsSkeleton v-else />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'

const route = useRoute()
const config = useRuntimeConfig()
const { t } = useI18n()
const orderStore = useOrderStore()
const { qulotOrderDetail: order } = storeToRefs(orderStore)

const title = computed(() => {
  let title = `${t('order.detailHeader')} | ${config.public.metadata.appName}`
  if (order.value) {
    title = t('order.no', { order: order.value.id })
  }
  return `${title} | ${config.public.metadata.appName}`
})

definePageMeta({
  middleware: ['auth'],
  validate: (route) => {
    return !isEmpty(route.params.id as string)
  },
})

useSeoMeta({
  title,
  ogTitle: title,
})

const orderPayment = computed(() => order.value?.payments?.[0])

onMounted(async () => {
  await orderStore.fetchQulotOrderDetail(route.params.id as string)

  if (!order.value) {
    showError({ message: 'Page not found', statusCode: 404 })
    return
  }

  if (order.value.status === 'in_process') {
    orderStore.subscribeQulotOrder(order.value.id)
  }
})
</script>
