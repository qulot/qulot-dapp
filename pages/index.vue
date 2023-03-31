<template>
  <div class="space-y-8">
    <HomeAppTopFeature id="summary" />
    <HomeListLotteries :lotteries="availableLotteries" />
    <HomeLandingLuckiest />
    <HomeLandingHowWork />
    <HomeLandingFeature />
    <HomeLandingPlatform />
    <HomeLandingTeamPartner />
    <HomeLandingPaymentCard />
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useProductStore } from '~~/stores/product'

const productStore = useProductStore()
const { availableLotteries } = storeToRefs(productStore)

await productStore.getLotteries()
</script>
