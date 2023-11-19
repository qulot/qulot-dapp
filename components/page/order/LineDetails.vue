<template>
  <div class="rounded-lg shadow-default p-2 lg:p-4 space-y-2 dark:bg-block">
    <!-- <h4 class="font-bold">Order Item: #{{ orderLine.id }}</h4> -->
    <h4 class="font-bold text-title">
      {{ orderLine?.round?.lottery?.verboseName }}
      {{ orderLine?.round?.lottery?.numberOfItems }}/{{
        orderLine?.round?.lottery?.maxValuePerItem
      }}
      ❘
      {{ $t('round.roundId', { round: orderLine?.round?.id }) }}
    </h4>

    <!-- Order Line Amount -->
    <div class="flex items-center justify-between text-content">
      <h5>{{ $t('order.detailLineAmount') }}</h5>
      <FiatValue :value="orderLine.totalAmount" :currency="order.currency" />
    </div>

    <!-- Order Line Eth Order ID -->
    <div
      v-if="orderLine.ethOrderId"
      class="flex items-center justify-between text-content"
    >
      <h5>{{ $t('order.detailViewOrderOnEthereum') }}</h5>
      <NuxtLink
        :to="
          localePath({
            name: 'eth-orders-id',
            params: { id: orderLine.ethOrderId, eth: order.ethBuyerAddr },
          })
        "
        class="flex items-center space-x-2"
      >
        <span>#{{ orderLine.ethOrderId }}</span>
        <svg-icon name="external-link" class="w-4 h-4" />
      </NuxtLink>
    </div>

    <!-- Order Line Create Date -->
    <div class="flex items-center justify-between text-content">
      <h5>{{ $t('order.detailCreateDate') }}</h5>
      <span>
        {{ formatDateTime(orderLine.createdAt, 'mmddyyyyhhss') }}
      </span>
    </div>

    <!-- Order Line Tickets -->
    <div v-if="orderLine.tickets" class="flex flex-col">
      <h5 class="mb-2 text-content">Tickets</h5>

      <div class="space-y-2">
        <TicketFiatItem
          v-for="ticket in orderLine.tickets"
          :key="ticket.id"
          :ticket="{
            ticketId: ticket.ethTicketId,
            roundId: orderLine.ethOrderId,
            numbers: ticket.numbers,
            round: orderLine.round,
          }"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { QulotOrderLine, QulotOrder } from '~~/types/order'
defineProps({
  order: {
    type: Object as PropType<QulotOrder>,
    required: true,
  },
  orderLine: {
    type: Object as PropType<QulotOrderLine>,
    required: true,
  },
})

const localePath = useLocalePath()
</script>
