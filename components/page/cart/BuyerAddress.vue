<template>
  <div class="mb-4 space-y-2 flex flex-col">
    <!-- Address input -->
    <FormKit
      v-model="ethBuyerAddress"
      :placeholder="$t('cart.chooseBuyerEthAddress')"
      :label="$t('order.buyerEthAddress')"
      :classes="{ label: 'title mb-1 lg:mb-4' }"
      type="text"
      name="buyerEthAddress"
      validation="required"
    >
      <template #suffixIcon>
        <svg-icon
          ref="btnCopyAddress"
          name="copy"
          class="w-4 h-4 cursor-pointer mr-3 text-content"
        />
      </template>
    </FormKit>

    <!-- Use wallet address -->
    <span
      v-if="isConnected"
      class="text-sm text-disable cursor-pointer"
      :class="{ 'text-main': ethBuyerAddress === address }"
      @click="useAddress('wallet')"
    >
      {{ $t('cart.useWalletAddress') }} {{ shortEthAddress(address as string) }}
    </span>

    <!-- Use account address -->
    <span
      v-if="isAuthenticated"
      :class="{ 'text-main': ethBuyerAddress === accountAddress }"
      class="text-sm text-disable cursor-pointer"
      @click="useAddress('account')"
    >
      {{ $t('cart.useAccountAddress') }}
      {{ shortEthAddress(accountAddress as string) }}
    </span>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'

type AddressType = 'wallet' | 'account' | 'custom'

const authStore = useAuthStore()
const cartStore = useCartStore()
const { isAuthenticated, loggedInUser } = storeToRefs(authStore)
const { ethBuyerAddress } = storeToRefs(cartStore)
const { address, isConnected } = useAccount()

const accountAddress = computed(() => loggedInUser.value?.ethAccount?.address)

const useAddress = (addressType: AddressType) => {
  switch (addressType) {
    case 'account':
      ethBuyerAddress.value = accountAddress.value
      break
    case 'wallet':
      ethBuyerAddress.value = address.value
      break
  }
}

onMounted(() => {
  ethBuyerAddress.value = accountAddress.value
  watch(isAuthenticated, () => {
    if (isAuthenticated.value) {
      ethBuyerAddress.value = accountAddress.value
    }
  })
})
</script>
