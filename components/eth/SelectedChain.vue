<template>
  <EthChain v-if="chainSelected" :chain="chainSelected" rounded />
</template>
<script setup lang="ts">
const { chainSelected } = useEthers()
</script>
