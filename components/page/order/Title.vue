<template>
  <div class="mb-4 text-title">
    <h1 class="text-[24px] font-bold overflow-hidden text-ellipsis">
      {{ $t('order.no', { order: order.id }) }}
    </h1>
    <h5 class="text-content">
      {{ $t('order.createdOn') }}
      {{ formatDateTime(order.createdAt, 'mmddyyyyhhss') }}
    </h5>
  </div>
</template>
<script setup lang="ts">
import { QulotOrder } from '~~/types/order'
defineProps({
  order: {
    type: Object as PropType<QulotOrder>,
    required: true,
  },
})
</script>
