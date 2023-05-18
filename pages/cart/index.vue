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
          <CartTicketList />
        </div>
      </div>
      <div class="lg:w-1/3">
        <div
          class="rounded-lg shadow-default p-2 lg:p-4 dark:bg-block sticky top-20"
        >
          <div class="flex items-center justify-between mb-2 lg:mb-4">
            <span class="font-bold text-[17px] lg:text-2xl text-title">{{
              $t('cart.checkout')
            }}</span>
          </div>
          <div class="flex items-center justify-between mb-4">
            <span class="text-sm text-disable">
              {{ $t('cart.accountBalance') }}:
            </span>
            <span v-if="tokenBalance" class="font-bold text-[17px] text-title">
              {{ tokenBalance.formatted }}
              <span class="text-xs">{{ tokenBalance?.symbol }}</span>
            </span>
          </div>
          <div class="border border-default p-2 rounded-lg mb-4 text-sm">
            <CartTicketGroupTable />
          </div>
          <!-- Payment method -->
          <div class="mb-4">
            <div class="title mb-1 lg:mb-4">
              {{ $t('cart.paymentMethod') }}
            </div>
            <div class="text-sm mb-2 text-disable">
              {{ $t('cart.choosePaymentMethod') }}
            </div>
            <CartListPaymentMethods />
            <div
              v-if="paymentError"
              class="flex items-center text-error text-xs mt-2 space-x-2"
            >
              <SvgIcon name="warnning" class="h-3 w-3" />
              <span>{{ paymentError }}</span>
            </div>
          </div>
          <!-- Summary -->
          <div
            class="mb-4 bg-title-nodark rounded-lg py-6 px-4 overflow-hidden text-white text-sm"
          >
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>{{ $t('cart.subtotal') }}:</div>
                <div class="font-bold">
                  {{ formatUnits(totalAmount, token?.decimals) }}
                  <span class="text-xs">{{ token?.symbol }}</span>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div>{{ $t('cart.discount') }}</div>
                <div class="font-bold">
                  {{ totalDiscountPercent.toNumber() }}%
                </div>
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
            <div class="flex items-center justify-between font-bold">
              <div class="text-[17px]">{{ $t('cart.total') }}:</div>
              <div class="text-2xl font-bold">
                {{ formatUnits(finalAmount, token?.decimals) }}
                <span class="text-xs">{{ token?.symbol }}</span>
              </div>
            </div>
          </div>

          <!-- Payment errors -->
          <div
            v-if="buyTicketsError"
            class="flex items-center text-error text-xs my-2 space-x-2"
          >
            <SvgIcon name="warnning" class="h-3 w-3" />
            <span>{{
              $t('errors.' + buyTicketsError) || $t('errors,unknownError')
            }}</span>
          </div>

          <div>
            <Button
              variant="primary"
              type="button"
              class="w-full rounded-lg"
              :disabled="!isAllowCheckout"
              :is-loading="buyTicketsLoading"
              @click="buyTickets"
            >
              {{ $t('cart.checkoutNow') }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatUnits } from 'ethers/lib/utils.js'
import { storeToRefs } from 'pinia'

const router = useRouter()
const config = useRuntimeConfig()
const { t } = useI18n()
const { token } = useQulot()
const { tokenBalance } = useAccount()
const cartStore = useCartStore()
const {
  totalAmount,
  finalAmount,
  totalDiscountPercent,
  isInsufficientTokenBalance,
  isAllowCheckout,
  buyTicketsLoading,
  buyTicketsError,
  validTickets,
} = storeToRefs(cartStore)

definePageMeta({
  layout: 'app',
})

const title = computed(
  () => `${t('cart.label')} | ${config.public.metadata.appName}`
)

const paymentError = computed(() => {
  if (isInsufficientTokenBalance.value) {
    return t('payment.insufficientTokenBalance', { token: token.value?.symbol })
  }
})

const buyTickets = () => {
  cartStore.buyTickets().then((isSuccess) => {
    if (isSuccess) {
      validTickets.value.forEach((ticket) => cartStore.remove(ticket.id))
      router.push('/tickets')
    }
  })
}

useSeoMeta({
  title,
  ogTitle: title,
})

onMounted(() => {
  cartStore.loadLocalStorage()
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
