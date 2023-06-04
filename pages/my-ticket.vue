<template>
  <div class="container mx-auto pt-16 pb-4 lg:pb-14">
    <div
      class="rounded-lg shadow-default mt-4 lg:mt-6 p-2 lg:p-4 dark:bg-block"
    >
      <div class="text-[17px] font-bold text-title mb-4">
        {{ $t('ticket.listTicket') }}
      </div>
      <div class="space-y-4">
        <TicketItem
          v-for="ticket in tickets"
          :key="ticket.id.toString()"
          :ticket="ticket"
          @claim-ticket="claimTickets(ticket.id)"
        />
        <TicketSkeletonItem v-show="isLoading" />
        <div v-if="!isEmptyTickets" class="w-full flex justify-center">
          <Button
            variant="primary"
            rounded
            :is-loading="isLoading"
            @click="loadMore"
          >
            {{ $t('labels.loadMore') }}
          </Button>
        </div>
      </div>
      <TicketEmpty v-if="isEmptyTickets" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { BigNumber } from 'ethers'
import { storeToRefs } from 'pinia'

const { t } = useI18n()
const { isConnected } = useAccount()
const config = useRuntimeConfig()
const ticketStore = useTicketStore()
const { tickets, isLoading, isEmpty: isEmptyTickets } = storeToRefs(ticketStore)

const title = computed(
  () => `${t('ticket.listTicket')} | ${config.public.metadata.appName}`
)

useSeoMeta({
  title,
  ogTitle: title,
})

const init = async () => {
  if (isConnected.value) {
    await ticketStore.init()
  }
}

const loadMore = async () => {
  if (isConnected.value) {
    await ticketStore.fetchTickets()
  }
}

const firstLoad = async () => {
  await init()
  await loadMore()
}

const claimTickets = async (ticketId: BigNumber) => {
  await ticketStore.claimTickets([ticketId])
  await ticketStore.refreshTicket(ticketId)
}

onMounted(async () => {
  await firstLoad()
  watch(
    isConnected,
    async () => {
      await firstLoad()
    },
    { deep: true }
  )
})
</script>
