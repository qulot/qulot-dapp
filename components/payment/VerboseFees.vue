<template>
  <component :is="tag" v-if="method.fees.length">
    <span>{{ $t('payment.fees.applyFee') }}</span>
    <span v-for="(fee, i) in method.fees" :key="fee.type">
      {{
        $t('payment.fees.' + fee.type, {
          value: verboseFeeValue(fee),
        })
      }}<template v-if="i === method.fees.length - 1">.</template>
      <template v-else>, </template>
    </span>
  </component>
</template>
<script lang="ts" setup>
import { PaymentMethod, QulotPaymentFee } from '~~/types/payment'

const props = defineProps({
  tag: {
    type: String,
    required: false,
    default: () => 'h6',
  },
  method: {
    type: Object as PropType<PaymentMethod>,
    required: true,
  },
})

const verboseFeeValue = (fee: QulotPaymentFee) => {
  return fee.isFixed
    ? formatFiatMoney(
        fee.value,
        'en',
        props.method.currency || 'USD',
        false,
        props.method.currency === 'USD' ? 100 : 1,
        false,
        0
      )
    : fee.value + '%'
}
</script>
