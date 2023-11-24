<template>
  <component
    :is="tag"
    v-if="isGasTooHigh"
    v-tippy="$t('payment.gasTooHigh')"
    class="cursor-pointer"
  >
    🔥
  </component>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
defineProps({
  tag: {
    type: String,
    required: false,
    default: () => 'span',
  },
})

const paymentStore = usePaymentStore()
const { isGasTooHigh } = storeToRefs(paymentStore)
</script>
