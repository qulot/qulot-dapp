<template>
  <span
    class="px-3 py-1 rounded-full h-8 text-xs font-bold text-white flex items-center space-x-1"
    :class="[
      {
        'bg-main': status === 'fulfilled',
        'bg-error': status === 'cancel',
        'bg-yellow': status === 'in_process',
        'bg-red-600': status === 'error',
        'border !text-black': status === 'placed',
      },
    ]"
  >
    <template v-if="showIcon">
      <svg-icon
        v-if="status === 'in_process'"
        name="loader"
        class="w-4 h-4 animate-[spin_2s_linear_infinite]"
      />
    </template>
    <span>{{ $t('order.status.' + status) }}</span>
  </span>
</template>
<script setup lang="ts">
import { OrderStatus } from '~~/types/order'

defineProps({
  status: {
    type: String as PropType<OrderStatus>,
    required: false,
    default: () => 'placed',
  },
  showIcon: {
    type: Boolean,
    required: false,
    default: () => false,
  },
})
</script>
