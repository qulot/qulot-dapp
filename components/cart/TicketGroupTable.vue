<template>
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
        class="py-2 border-b border-default last:border-none dark:text-white"
      >
        <td class="py-3">
          {{ cartItemGroup.lotteryVerboseName }}
        </td>
        <td class="py-3">x{{ cartItemGroup.qty }}</td>
        <td class="py-3">
          {{ cartItemGroup.lotteryPricePerTicket }}
          <span class="text-xs">{{ token?.symbol }}</span>
        </td>
        <td class="py-3 text-right">
          {{ cartItemGroup.total }}
          <span class="text-xs">{{ token?.symbol }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { token } = useQulot()
const cartStore = useCartStore()
const { ticketsSummaryByLotteryId } = storeToRefs(cartStore)
</script>
