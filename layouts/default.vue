<template>
  <div class="flex flex-col min-h-screen">
    <!-- Page header -->
    <PageHeader />
    <!-- Render contents with transition -->
    <main class="flex-grow">
      <slot></slot>
    </main>
    <!-- Page footer -->
    <PageFooter />
  </div>
</template>
<script setup lang="ts">
import { useLotteryStore } from '~~/stores/lottery'
const lotteryStore = useLotteryStore()
await lotteryStore.fetchLotteries()
</script>
