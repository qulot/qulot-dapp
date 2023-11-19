<template>
  <section class="container mx-auto pt-24 pb-4 lg:pb-14 lg:px-20">
    <div class="space-x-2">
      <svg-icon
        name="loader"
        class="animate-[spin_2s_linear_infinite] w-6 h-6 mix-blend-difference"
      />
      <span class="text-sm lg:text-2xl text-title mb-4">
        {{ $t('message.processingPlsWaitSecond') }}
      </span>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()
const orderStore = useOrderStore()
const { qulotOrderDetail, error } = storeToRefs(orderStore)

definePageMeta({
  validate: (route) => {
    return !isEmpty(route.params.id as string)
  },
})

onBeforeMount(async () => {
  await orderStore.cancelQulotOrder(route.params.id as string)
  if (error.value != null) {
    showError({ message: error.value, statusCode: 520 })
  } else if (qulotOrderDetail.value?.status === 'cancel') {
    router.push(
      localePath({ name: 'orders-id', params: { id: route.params.id } })
    )
  }
})

onUnmounted(() => {
  orderStore.clear()
})
</script>
