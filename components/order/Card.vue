<template>
  <div
    class="rounded-lg shadow-default p-2 lg:p-4 space-y-2 lg:space-y-4 dark:bg-block"
  >
    <div class="grid grid-rows-1 grid-cols-2 lg:grid-flow-col lg:grid-cols-3">
      <!-- Order Info -->
      <NuxtLink
        :to="
          localePath({
            name: 'eth-orders-id',
            params: { id: order.id, eth: order.user?.id },
          })
        "
        class="order-1 lg:col-span-2"
      >
        <h3 class="text-[17px] font-bold text-title mb-2 lg:mb-4">
          {{ $t('order.no', { order: order.id }) }}
        </h3>
      </NuxtLink>

      <!-- Order Detail -->
      <div
        class="order-3 lg:order-2 col-span-2 lg:col-span-2 grid grid-cols-2 grid-rows-2 lg:grid-rows-1 lg:grid-cols-3 gap-2"
      >
        <!-- Order Date -->
        <div class="dark:text-white">
          {{ $t('order.date') }}
          <span>{{ formatTimestamp(order.timestamp, 'mmddyyyy') }}</span>
        </div>

        <!-- Round Id -->
        <div class="dark:text-white">
          {{ $t('round.roundId', { round: order.round?.id }) }}
        </div>

        <!-- Order Amount -->
        <div class="dark:text-white">
          {{ $t('order.total') }}
          <TokenValue
            :value="order.orderAmount"
            show-symbol
            tag="span"
            class="font-bold text-main"
          />
        </div>
      </div>

      <!-- Order Show Ticket Button -->
      <div
        class="order-2 lg:order-3 lg:row-span-2 flex justify-end lg:items-center"
      >
        <svg-icon
          name="chevron-left"
          class="h-6 w-6 duration-100 cursor-pointer [&_path]:stroke-black dark:[&_path]:stroke-white"
          :class="{ 'rotate-180': showTickets }"
          @click="handleExpandIconClick"
        />
      </div>
    </div>
    <!-- Order Ticket List -->
    <Collapse :show="showTickets" class="space-y-4">
      <!-- Ticket loading placeholder -->
      <TicketSkeletonItem v-show="isLoadingTicket" />

      <!-- Ticket list -->
      <TicketItem
        v-for="ticket in orderTickets"
        :key="ticket.ticketId.toString()"
        :ticket="ticket"
        @claim-ticket="claimTickets"
      />
    </Collapse>
  </div>
</template>
<script lang="ts" setup>
import { BigNumber } from 'ethers'
import { Order } from '~~/types/order'
import { Ticket } from '~~/types/ticket'

const emit = defineEmits<{
  (event: 'expand', orderId: string, show: boolean): void
  (event: 'claimTickets', orderId: string, ticketIds: BigNumber[]): void
}>()

const props = defineProps({
  order: {
    type: Object as PropType<Order>,
    required: true,
  },
  isLoadingTicket: {
    type: Boolean,
    required: false,
    default: true,
  },
  orderTickets: {
    type: Array<Ticket>,
    required: false,
    default: () => [],
  },
  isExpand: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const localePath = useLocalePath()
const showTickets = ref(false)

const handleExpandIconClick = () => {
  showTickets.value = !showTickets.value
  emit('expand', props.order.id, showTickets.value)
}

const claimTickets = () => {
  const winTickets = props.orderTickets
    .filter((ticket) => ticket.winStatus)
    .map((ticket) => ticket.ticketId)
  if (winTickets.length > 0) {
    emit('claimTickets', props.order.id, winTickets)
  }
}

onMounted(() => {
  if (props.isExpand) {
    showTickets.value = true
    emit('expand', props.order.id, showTickets.value)
  }
})
</script>
