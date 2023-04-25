<template>
  <div class="space-y-8 lg:space-y-10">
    <HomeLuckyMachine :total-prize="totalPrize" :total-users="totalUsers" />
    <HomeLuckiestWinners class="!-mt-0" :ranks="ranks" />
    <HomeListLotteries :lotteries="availableLotteries" />
    <HomeHowItWorks />
    <HomeInnovativeFeatures />
    <Home1stPlatform />
    <HomeTeamPartner />
    <HomeListPartners />
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'

const homeStore = useHomeStore()
const { totalPrize, totalUsers, ranks } = storeToRefs(homeStore)
await homeStore.fetchTotalUsersTotalPrize()
await homeStore.fetchUsersWinPrizeRanks()

const lotteryStore = useLotteryStore()
const { availableLotteries } = storeToRefs(lotteryStore)
</script>
