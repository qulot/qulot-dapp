<template>
  <div
    class="rounded-lg shadow-default p-2 lg:p-4 space-y-2 lg:space-y-4 dark:bg-block"
  >
    <div class="grid grid-rows-1 grid-cols-2 lg:grid-flow-col lg:grid-cols-4">
      <!-- Order Info -->
      <div class="order-1 lg:col-span-3 mb-2 lg:mb-4">
        <NuxtLink
          :to="
            localePath({
              name: 'orders-id',
              params: { id: order.id },
            })
          "
          class="text-[17px] font-bold text-title"
        >
          {{ $t('order.no', { order: order.id }) }}
        </NuxtLink>
      </div>

      <!-- Order Detail -->
      <div
        class="order-3 lg:order-2 col-span-2 lg:col-span-3 grid grid-rows-3 lg:grid-rows-1 lg:grid-cols-3 gap-2"
      >
        <!-- Order Date -->
        <div class="text-content">
          {{ $t('order.date') }}
          <span>{{ formatDateTime(order.createdAt, 'mmddyyyy') }}</span>
        </div>

        <!-- Payment method -->
        <div class="text-content">
          <PaymentMethod :method="order.paymentMethod" show-icon />
        </div>

        <!-- Order Amount -->
        <div class="text-content">
          {{ $t('order.total') }}
          <FiatValue
            :value="order.totalPayAmount"
            :currency="order.currency"
            tag="span"
            class="font-bold text-main"
          />
        </div>
      </div>

      <!-- Order Show Ticket Button -->
      <div
        class="order-2 lg:order-4 lg:row-span-2 flex justify-end lg:items-center"
      >
        <OrderStatus :status="order.status" show-icon />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { QulotOrder } from '~~/types/order'

defineProps({
  order: {
    type: Object as PropType<QulotOrder>,
    required: true,
  },
})

const localePath = useLocalePath()
</script>
