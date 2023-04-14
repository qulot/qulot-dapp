<template>
  <Button variant="primary" rounded class="gap-2" @click="onClick">
    <template v-if="wallet.status === 'connected' || wallet.status === 'reconnecting'">
      <span class="rounded-full bg-white w-7 h-7 p-1 flex items-center justify-center">
        <svg-icon name="wallet" class="text-main" />
      </span>
      <span class="text-white hidden lg:inline-block">
        {{ readableAddress }}
      </span>
    </template>
    <template v-else-if="wallet.status === 'connecting'">
      <svg-icon name="loader" class="w-4 h-4 animate-spin" />
      {{ $t('wallet.connecting') }}
    </template>
    <template v-else>{{ $t('wallet.connect') }}</template>
  </Button>
  <ModalSelectWallet v-model="showModalConnectWallet" />
  <ModalYourWallet v-model:show="showModalYourWallet" />
</template>
<script setup lang="ts">
const { wallet } = useEthers()

const readableAddress = computed(() => shortEthAddress(wallet.value.account as string))

const showModalConnectWallet = ref(false)
const showModalYourWallet = ref(false)

watch(wallet, (newValue) => {
  if (newValue.status === 'connected') {
    showModalConnectWallet.value = false
  }
}, { deep: true })

const onClick = () => {
  if (wallet.value.status === 'disconnected') {
    showModalConnectWallet.value = true
  } else if (wallet.value.status === 'connected' || wallet.value.status === 'reconnecting') {
    showModalYourWallet.value = true
  }
}
</script>
