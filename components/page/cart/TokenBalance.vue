<template>
  <div v-if="tokenBalance" class="flex items-center justify-between mb-4">
    <span class="text-sm text-disable"> {{ $t('cart.accountBalance') }}: </span>
    <TokenValue
      class="font-bold text-[17px] text-title"
      :value="tokenBalance.value"
      show-symbol
    />
  </div>
</template>
<script lang="ts" setup>
const { tokenBalance } = useAccount()
</script>
