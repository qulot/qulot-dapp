<template>
  <span
    class="px-3 py-1 rounded-full h-8 text-xs font-bold text-white flex items-center space-x-1"
    :class="[
      {
        'bg-main': status === 'full' || status === 'overcharged',
        'bg-yellow': status === 'overcharged',
        'bg-red-600': status === 'partial',
        'border !text-black': status === 'none',
      },
    ]"
  >
    {{ $t('payment.chargeStatus.' + status) }}
  </span>
</template>
<script setup lang="ts">
import { ChargeStatus } from '~~/types/payment'

defineProps({
  status: {
    type: String as PropType<ChargeStatus>,
    required: false,
    default: () => 'none',
  },
})
</script>
