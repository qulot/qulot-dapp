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
        v-for="cartItemGroup in cartItemsGroup"
        :key="cartItemGroup.lotteryId"
        class="py-2 border-b border-default last:border-none"
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
import { BigNumber } from 'ethers/lib/ethers'
import { formatEther } from 'ethers/lib/utils.js'
import { storeToRefs } from 'pinia'
import { CartItemsGroup } from '~~/types/ticket'

const { token } = useQulot()
const cartStore = useCartStore()
const lotteryStore = useLotteryStore()
const { lotteryAsKeys } = storeToRefs(lotteryStore)
const { ticketsGroupByLotteryId } = storeToRefs(cartStore)

const cartItemsGroup = computed<CartItemsGroup[]>(() => {
  const cartItems: CartItemsGroup[] = []
  if (ticketsGroupByLotteryId.value) {
    for (const lotteryId of Object.keys(ticketsGroupByLotteryId.value)) {
      if (lotteryAsKeys.value[lotteryId]) {
        const lotteryPricePerTicket =
          lotteryAsKeys.value[lotteryId]?.pricePerTicket || '0'
        cartItems.push({
          lotteryId,
          qty: ticketsGroupByLotteryId.value[lotteryId].length,
          lotteryVerboseName: lotteryAsKeys.value[lotteryId].verboseName,
          lotteryPricePerTicket: formatEther(lotteryPricePerTicket),
          total: formatEther(
            BigNumber.from(lotteryPricePerTicket).mul(
              ticketsGroupByLotteryId.value[lotteryId].length
            )
          ),
        })
      }
    }
  }
  return cartItems
})
</script>
