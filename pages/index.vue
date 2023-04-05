<template>
  <div class="space-y-8 lg:space-y-10">
    <HomeLuckyMachine :total-prize="totalPrize" :total-users="totalUsers" />
    <HomeLuckiestWinners class="!-mt-0" :ranks="ranks" />
    <HomeListLotteries :lotteries="availableLotteries" />
    <HomeHowItWorks />
    <HomeInnovativeFeatures />
    <Home1stPlatform />
    <HomeTeamPartner />
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
