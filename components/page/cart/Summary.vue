<template>
  <div
    class="mb-4 bg-title-nodark rounded-lg py-6 px-4 overflow-hidden text-white text-sm"
  >
    <div class="space-y-3">
      <!-- Sub total -->
      <div class="flex items-center justify-between">
        <div>{{ $t('cart.subtotal') }}:</div>

        <TokenValue
          v-if="isDeFiPayment"
          class="font-bold"
          :value="totalAmount"
          show-symbol
          use-fiat-value
          hide-subunits
        />
        <FiatValue
          v-else
          class="font-bold"
          :value="totalAmountFiat.amount || 0"
          :currency="totalAmountFiat.currency"
        />
      </div>

      <!-- Total discount -->
      <div v-if="totalDiscount" class="flex items-center justify-between">
        <div>{{ $t('cart.discount') }}</div>
        <div class="font-bold">{{ totalDiscount }}%</div>
      </div>

      <!-- Fee list -->
      <div
        v-for="(fee, i) in fees"
        :key="i"
        class="flex items-center justify-between"
      >
        <div>{{ $t('cart.' + fee.type) }}:</div>
        <FiatValue
          v-if="fee.amountFiat"
          class="font-bold"
          :value="fee.amountFiat || 0"
          :currency="fee.currencyFiat"
        />

        <EthValue
          v-else-if="fee.amount"
          class="font-bold"
          :value="fee.amount"
          :symbol="fee.currency"
          :fixed="4"
          show-symbol
        />
      </div>
    </div>

    <div class="border-b border-dashed border-default relative my-6">
      <span
        class="rounded-full h-3 w-3 bg-white dark:bg-block absolute -left-4 -ml-1.5 -mt-1.5"
      />
      <span
        class="rounded-full h-3 w-3 bg-white dark:bg-block absolute -right-4 -mr-1.5 -mt-1.5"
      />
    </div>

    <!-- Total pay amount -->
    <div class="flex items-center justify-between font-bold">
      <div class="text-[17px]">{{ $t('cart.total') }}:</div>
      <TokenValue
        v-if="isDeFiPayment"
        class="text-2xl font-bold"
        :value="finalAmount"
        show-symbol
        use-fiat-value
        hide-subunits
      />
      <FiatValue
        v-else
        class="text-2xl font-bold"
        :value="finalAmountFiat.amount || 0"
        :currency="finalAmountFiat.currency"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { isDeFiPayment } = usePayment()
const cartStore = useCartStore()
const {
  totalAmount,
  finalAmount,
  totalDiscount,
  totalAmountFiat,
  finalAmountFiat,
  fees,
} = storeToRefs(cartStore)
</script>
