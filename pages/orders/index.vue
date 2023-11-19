<template>
  <div class="container mx-auto pt-24 pb-4 lg:pb-14 lg:px-20">
    <h1 class="text-[24px] font-bold text-title mb-4">
      {{ $t('order.header') }}
    </h1>
    <div class="space-y-4">
      <!-- Order list -->
      <OrderQulotCard
        v-for="order in ordersNotPlaced"
        :key="order.id"
        :order="order"
      />

      <!-- Order loading placeholder -->
      <OrderSkeleton v-show="isLoading" />

      <!-- Order load more -->
      <div class="w-full flex justify-center">
        <!-- Order is empty -->
        <OrderEmpty v-if="isComplete && qulotOrders.length === 0" />

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

const { t } = useI18n()
const config = useRuntimeConfig()
const orderStore = useOrderStore()
const { isLoading, qulotOrders, isComplete } = storeToRefs(orderStore)

const title = computed(
  () => `${t('order.header')} | ${config.public.metadata.appName}`
)

useSeoMeta({
  title,
  ogTitle: title,
})

const ordersNotPlaced = computed(() =>
  qulotOrders.value.filter((order) => order.status !== 'placed')
)

const loadMore = async () => {
  orderStore.nextQulotPage()
  await orderStore.fetchQulotOrders()
}

onMounted(async () => {
  await orderStore.fetchQulotOrders()
})
</script>
