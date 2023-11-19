<template>
  <div class="rounded-lg shadow-default p-2 lg:p-4 space-y-2 dark:bg-block">
    <h4 class="font-bold text-title">{{ $t('payment.detail') }}</h4>

    <!-- Payment method -->
    <PaymentMethod
      class="flex justify-between text-content"
      :method="orderPayment.method"
    />

    <!-- Payment Amount -->
    <div class="flex items-center justify-between text-content">
      <h5>{{ $t('payment.detailAmount') }}</h5>
      <FiatValue
        :value="orderPayment.amount"
        :currency="orderPayment.currency"
      />
    </div>

    <!-- Payment Charge Status -->
    <div class="flex items-center justify-between text-content">
      <h5>{{ $t('payment.detailChargeStatus') }}</h5>
      <PaymentChargeStatus :status="orderPayment.chargeStatus" />
    </div>

    <!-- Payment Create Date -->
    <div class="flex items-center justify-between text-content">
      <h5>{{ $t('payment.detailCreateDate') }}</h5>
      <span>
        {{ formatDateTime(orderPayment.createdAt, 'mmddyyyyhhss') }}
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { QulotPayment } from '~~/types/payment'
defineProps({
  orderPayment: {
    type: Object as PropType<QulotPayment>,
    required: true,
  },
})
</script>
