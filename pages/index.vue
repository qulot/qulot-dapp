<template>
  <div class="space-y-8">
    <HomeAppTopFeature :total-prize="totalPrize" :total-users="totalUsers"/>
    <HomeLandingLuckiest class="!-mt-0" :ranks="ranks" />
    <HomeListLotteries :lotteries="availableLotteries" />
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
import { useHomeStore } from '~~/stores/home'

const homeStore = useHomeStore()
const { totalPrize, totalUsers, ranks } = storeToRefs(homeStore)
await homeStore.fetchTotalUsersTotalPrize()
await homeStore.fetchUsersWinPrizeRanks()

const productStore = useProductStore()
const { availableLotteries } = storeToRefs(productStore)
</script>
