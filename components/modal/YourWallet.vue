<template>
  <Modal
    v-model="showValue"
    :title="$t('wallet.yourWallet')"
    header-class="px-6 py-4 border-b border-[#D8D8D8] dark:border-slate-400"
    body-class="px-6 py-4 border-b border-[#D8D8D8] dark:border-slate-400 space-y-4"
    footer-class="px-6 py-4"
    size="xs"
  >
    <template #body>
      <!-- Account Address -->
      <div class="w-100">
        <h4 class="text-sm text-main font-bold mb-2">
          {{ $t('wallet.yourAddress') }}
        </h4>
        <div
          class="rounded-lg bg-[#F3EFFF] p-2 flex justify-between items-center"
        >
          <span class="overflow-hidden text-ellipsis max-w-full">{{
            wallet.account
          }}</span>
          <svg-icon
            ref="btnCopyAddress"
            name="copy"
            class="w-4 h-4 cursor-pointer ml-2"
            @click="copyClipboard"
          />
        </div>
      </div>

      <!-- Current Chain -->
      <div class="w-100">
        <h4 class="text-sm text-main font-bold mb-2">
          {{ $t('wallet.viewOnExplorer') }}
        </h4>
        <div
          v-if="chainSelected"
          class="flex justify-between items-center whitespace-nowrap space-x-2"
        >
          <EthSelectedChain class="w-1/2" />
          <NuxtLink
            v-if="explorerAccount"
            :to="explorerAccount.link"
            class="text-main"
            target="_blank"
          >
            {{ explorerAccount.name }}
            <svg-icon name="external-link" class="w-4 h-4" />
          </NuxtLink>
        </div>
      </div>

      <!-- Account Balance -->
      <div v-if="balance && tokenBalance" class="w-100 space-y-2">
        <!-- Eth balance -->
        <h4 class="text-sm text-main font-bold">{{ $t('wallet.balances') }}</h4>
        <div class="flex items-center justify-between text-content">
          <h5>{{ $t('wallet.balance', { balance: balance.symbol }) }}</h5>
          <span class="font-bold">{{
            formatFloatFixed(balance.formatted, 4)
          }}</span>
        </div>

        <!-- Token balance -->
        <div class="flex items-center justify-between text-content">
          <h5>{{ $t('wallet.balance', { balance: tokenBalance.symbol }) }}</h5>
          <TokenValue
            :value="tokenBalance.value"
            :fixed="4"
            class="font-bold"
          />
        </div>
      </div>
    </template>
    <template #footer>
      <Button
        variant="danger"
        rounded
        class="w-full"
        @click="onDisconnectClick"
      >
        {{ $t('wallet.disconnect') }}
      </Button>
    </template>
  </Modal>
</template>
<script setup lang="ts">
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:show', 'disconnect'])

const showValue = computed({
  get() {
    return props.show
  },
  set(value) {
    emit('update:show', value)
  },
})

const { wallet, chainSelected, disconnect } = useEthers()
const { balance, tokenBalance } = useAccount()
const btnCopyAddress = ref()

const onDisconnectClick = () => {
  disconnect()
  emit('disconnect')
}

const explorerAccount = computed(() => {
  if (
    chainSelected.value &&
    chainSelected.value.blockExplorers &&
    wallet.value.account
  ) {
    return {
      name: chainSelected.value.blockExplorers.default.name,
      link: `${chainSelected.value.blockExplorers.default.url}/address/${wallet.value.account}`,
    }
  }
  return null
})

const copyClipboard = () => {
  if (wallet.value.account) {
    copyContent(wallet.value.account).then(() => {
      useTippy(btnCopyAddress.value.$el, {
        content: 'Copied!',
        showOnCreate: true,
        duration: 100,
      })
    })
  }
}
</script>
