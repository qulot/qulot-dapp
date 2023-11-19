<template>
  <div v-if="token && tickets.length" class="list-ticket space-y-4 relative">
    <CartTicketItem
      v-for="ticket in tickets"
      :key="ticket.id"
      :round-id="ticket.roundId"
      :currency="token?.symbol"
      :pick-numbers="ticket.pickNumbers"
      :selected="ticket.selected"
      :price-per-ticket="
        formatUnits(lotteryTicketPrices[ticket.lotteryId], token?.decimals)
      "
      :lottery-picture="lotteryAsKeys[ticket.lotteryId]?.picture"
      :lottery-verbose-name="lotteryAsKeys[ticket.lotteryId]?.verboseName"
      :disabled="!ticketsRoundIsOpen.includes(ticket)"
      @delete="deleteTicket(ticket.id)"
      @select="toggleSelectTicket(ticket.id)"
    />
  </div>
  <CartEmpty v-else />
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { formatUnits } from 'ethers/lib/utils.js'
const { token } = useQulot()
const cartStore = useCartStore()
const lotteryStore = useLotteryStore()
const { lotteryAsKeys, lotteryTicketPrices } = storeToRefs(lotteryStore)
const { tickets, ticketsRoundIsOpen } = storeToRefs(cartStore)
const deleteTicket = (ticketId: number) => {
  cartStore.remove(ticketId)
}
const toggleSelectTicket = (ticketId: number) => {
  cartStore.toggleSelect(ticketId)
}
</script>
