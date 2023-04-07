<template>
  <section class="relative flex items-center w-full">
    <div class="container mx-auto">
      <div class="space-y-4 lg:space-y-6">
        <a href="#lotteries"></a>
        <HomeLotteryCard
          v-for="(lottery, i) in lotteries"
          :key="i"
          class="w-full p-3 md:p-6"
          :lottery="lottery"
        />
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { Lottery } from '~~/types/lottery'

defineProps({
  lotteries: {
    type: Array<Lottery>,
    require: true,
    default: () => [],
  },
})
</script>
