<template>
  <div class="pt-16 pb-4 lg:pb-14 container mx-auto">
    <div
      class="pt-6 flex flex-col space-y-6 lg:flex-row lg:space-x-6 lg:space-y-0"
    >
      <div class="lg:w-2/3">
        <div class="rounded-lg shadow-default p-2 lg:p-4 dark:bg-block">
          <div
            class="font-bold text-[17px] lg:text-2xl text-title mb-2 lg:mb-4"
          >
            {{ $t('ticket.listTicket') }}
          </div>
          <PageCartTicketList />
        </div>
      </div>
      <div class="lg:w-1/3">
        <div
          class="rounded-lg shadow-default p-2 lg:p-4 dark:bg-block sticky top-20"
        >
          <FormKit type="form" :actions="false" @submit="buyTickets">
            <div class="flex items-center justify-between mb-2 lg:mb-4">
              <span class="font-bold text-[17px] lg:text-2xl text-title">{{
                $t('cart.checkout')
              }}</span>
            </div>

            <!-- Wallet connect token balance -->
            <PageCartTokenBalance />

            <!-- Cart summary -->
            <PageCartTicketGroupTable />

            <!-- Payment method -->
            <PageCartListPaymentMethods />

            <!-- Buyer eth address -->
            <PageCartBuyerAddress v-if="!isDeFiPayment" />

            <!-- Summary -->
            <PageCartSummary />

            <!-- Payment errors -->
            <PageCartError />

            <div>
              <Button
                variant="primary"
                class="w-full rounded-lg"
                :disabled="!isAllowCheckout"
                :is-loading="buyTicketsLoading"
                type="submit"
              >
                {{ $t('cart.checkoutNow') }}
              </Button>
            </div>
          </FormKit>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

const config = useRuntimeConfig()
const { t } = useI18n()
const { address } = useAccount()
const { payment, isDeFiPayment } = usePayment()
const cartStore = useCartStore()
const ticketStore = useTicketStore()
const { isAllowCheckout, buyTicketsLoading, validTickets, paymentReceipt } =
  storeToRefs(cartStore)

const title = computed(
  () => `${t('cart.label')} | ${config.public.metadata.appName}`
)

const buyTickets = (data: any) => {
  console.log(data)

  cartStore.buyTickets().then((isSuccess) => {
    if (isSuccess) {
      validTickets.value.forEach((ticket) => cartStore.remove(ticket.id))
      ticketStore.clear()
      if (
        paymentReceipt.value?.status === 'success' &&
        paymentReceipt.value?.redirectUrl
      ) {
        navigateTo(paymentReceipt.value.redirectUrl, {
          external: isExternalURL(paymentReceipt.value.redirectUrl),
        })
      }
    }
  })
}

useSeoMeta({
  title,
  ogTitle: title,
})

onMounted(() => {
  setTimeout(() => {
    cartStore.loadLocalStorage()
    cartStore.refresh()

    watch(address, () => {
      cartStore.refresh()
    })

    watch(payment, () => {
      cartStore.refresh()
    })
  }, 2000)
})
</script>

<style scoped>
.saw-border {
  background-image: linear-gradient(135deg, #fff 50%, transparent 50%),
    linear-gradient(45deg, #fff 50%, transparent 50%),
    linear-gradient(-135deg, #fff 50%, transparent 50%),
    linear-gradient(-45deg, #fff 50%, transparent 50%);
  background-position: top left, top left, top right, top right;
  background-size: 8px 8px;
  background-repeat: repeat-y;
}
</style>
