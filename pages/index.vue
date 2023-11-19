<template>
  <div class="space-y-8 lg:space-y-10">
    <PageHomeLuckyMachine :total-prize="totalPrize" :total-users="totalUsers" />
    <PageHomeLuckiestWinners class="!-mt-0" :ranks="ranks" />
    <PageHomeListLotteries :lotteries="lotteries" />
    <PageHomeHowItWorks />
    <PageHomeInnovativeFeatures />
    <PageHome1stPlatform />
    <PageHomeTeamPartner />
    <PageHomeListPartners />
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'

const homeStore = useHomeStore()
const { totalPrize, totalUsers, ranks } = storeToRefs(homeStore)
const lotteryStore = useLotteryStore()
const { lotteries } = storeToRefs(lotteryStore)

onMounted(async () => {
  await homeStore.fetchTotalUsersTotalPrize()
  await homeStore.fetchUsersWinPrizeRanks()
})
</script>
