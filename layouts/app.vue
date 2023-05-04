<template>
  <div class="flex flex-col min-h-screen">
    <!-- Page header -->
    <PageHeader />
    <!-- Render contents with transition -->
    <main class="flex-grow">
      <slot></slot>
    </main>
    <!-- Modals -->
    <ModalsContainer />
  </div>
</template>
<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal'
import { useLotteryStore } from '~~/stores/lottery'
const lotteryStore = useLotteryStore()
await lotteryStore.fetchLotteries()
</script>
