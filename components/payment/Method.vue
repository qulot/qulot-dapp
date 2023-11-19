<template>
  <div
    v-if="paymentMethod && paymentMethod.show()"
    class="flex items-center space-x-2"
  >
    <span>{{ $t('payment.label') }}:</span>
    <div class="flex items-center space-x-2">
      <img
        :src="paymentMethod.icon"
        :alt="paymentMethod.name()"
        class="w-5 h-5"
      />
      <span>{{ $t('payment.methods.' + method) }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  method: {
    type: String,
    required: true,
  },
  showIcon: {
    type: Boolean,
    required: false,
    default: () => false,
  },
})

const { paymentMethods } = usePayment()

const paymentMethod = computed(() =>
  paymentMethods.find((method) => method.id === props.method)
)
</script>
