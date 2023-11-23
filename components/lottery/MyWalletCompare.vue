<template>
  <div class="rounded-lg bg-[#7230C0]">
    <div
      class="bg-[#8B5CFF] rounded-t-lg px-4 py-3.5 flex items-center justify-between"
    >
      <h2 class="text-[17px] font-bold text-white">
        {{ $t('wallet.myWallet') }}
      </h2>
    </div>
    <div class="p-2 lg:p-4 grid grid-cols-2 gap-2 lg:gap-4">
      <CardItemWallet
        :title="$t('wallet.myBalance')"
        :is-loading="balance.isLoading"
      >
        <TokenValue
          :value="balance.amount"
          show-symbol
          use-fiat-value
          hide-subunits
        />
      </CardItemWallet>
      <CardItemWallet
        :title="$t('lottery.pricePerTicket')"
        :is-loading="pricePerTicket.isLoading"
      >
        <TokenValue
          :value="pricePerTicket.amount"
          show-symbol
          use-fiat-value
          hide-subunits
        />
      </CardItemWallet>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
const lotteryStore = useLotteryStore()
const { tokenBalance } = useAccount()
const { token } = useQulot()
const { lottery } = storeToRefs(lotteryStore)

const balance = ref<{
  isLoading: boolean
  amount?: string
}>({ isLoading: true })
const pricePerTicket = ref<{
  isLoading: boolean
  amount?: string
}>({
  isLoading: true,
})

const checkTokenBalance = () => {
  if (token.value && tokenBalance.value) {
    balance.value.isLoading = false
    balance.value.amount = tokenBalance.value.value
  }
}

const checkPricePerTicket = () => {
  if (lottery.value && token.value) {
    pricePerTicket.value.isLoading = false
    pricePerTicket.value.amount = lottery.value.pricePerTicket
  }
}

watch(
  tokenBalance,
  (_) => {
    checkTokenBalance()
  },
  { deep: true }
)

watch(
  token,
  (_) => {
    checkPricePerTicket()
  },
  { deep: true }
)

onMounted(() => {
  checkTokenBalance()
  checkPricePerTicket()
})
</script>
