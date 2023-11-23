<template>
  <div class="border border-default p-2 rounded-lg mb-4 text-sm">
    <table class="table-auto w-full">
      <thead class="text-left text-disable font-normal">
        <tr>
          <th class="font-normal">{{ $t('cart.product') }}</th>
          <th class="font-normal">{{ $t('cart.quantity') }}</th>
          <th class="font-normal">{{ $t('cart.price') }}</th>
          <th class="font-normal text-right">
            {{ $t('cart.total') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="cartItemGroup in ticketsSummaryByLotteryId"
          :key="cartItemGroup.lotteryId"
          class="py-2 border-b border-default last:border-none text-content"
        >
          <td class="py-3">
            {{ cartItemGroup.lotteryVerboseName }}
          </td>
          <td class="py-3">x{{ cartItemGroup.qty }}</td>
          <td class="py-3">
            <TokenValue
              :value="cartItemGroup.lotteryPricePerTicket"
              show-symbol
              use-fiat-value
              hide-subunits
            />
          </td>
          <td class="py-3 text-right">
            <TokenValue
              :value="cartItemGroup.total"
              show-symbol
              use-fiat-value
              hide-subunits
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'

const cartStore = useCartStore()
const { ticketsSummaryByLotteryId } = storeToRefs(cartStore)
</script>
