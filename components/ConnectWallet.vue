<template>
  <Dropdown v-show="connected" :items="items" class="bg-main p-2 rounded gap-2">
    <span class="rounded-full bg-white w-7 h-7 p-1 flex items-center justify-center">
      <svg-icon name="wallet" class="text-main" />
    </span>
    <span class="text-white hidden lg:inline-block">
      {{ readableAddress }}
    </span>
  </Dropdown>
  <Button v-show="!connected" variant="primary" rounded class="gap-2" @click="show = true">
    {{ $t('labels.connectWallet') }}
  </Button>
  <ModalSelectWallet v-model="show"/>
</template>
<script setup lang="ts">
const { connected, connectedAddress } = useWallet()

const items = computed(() => [
  { text: 'View on Explorer' },
  { text: 'Transactions' },
  { text: 'Disconnect' },
])

const readableAddress = computed(() => shortEthAddress(connectedAddress.value))

const show = ref(false)


</script>
