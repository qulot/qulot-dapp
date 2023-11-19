<template>
  <section class="mx-auto max-w-[35rem]">
    <PageLotteryPrintRoundResult v-if="isExists" :round="round" />
  </section>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'

definePageMeta({
  layout: 'print',
  validate: (route) => {
    return isNumeric(route.query.roundId)
  },
})

const route = useRoute()
const roundStore = useRoundStore()
const { isExists, round } = storeToRefs(roundStore)

await roundStore.fetchRound(route.query.roundId as string)

if (!isExists.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
  })
}
</script>
