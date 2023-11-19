<template>
  <div class="container mx-auto pt-24 pb-4 lg:pb-14 lg:px-20">
    <h1 class="text-[24px] font-bold text-title mb-4">
      {{ $t('ticket.header') }}
    </h1>
    <div class="space-y-4">
      <!-- Ticket List -->
      <TicketItem
        v-for="ticket in tickets"
        :key="ticket.ticketId.toString()"
        :ticket="ticket"
        @claim-ticket="claimTickets(ticket.ticketId)"
      />

      <!-- Ticket loading placeholder -->
      <TicketSkeletonItem v-show="isLoading" />

      <!-- Ticket Empty -->
      <template v-if="isEmptyTickets">
        <PageTicketEmpty />
      </template>

      <div v-else class="w-full flex justify-center">
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
  </div>
</template>
<script setup lang="ts">
import { BigNumber, utils } from 'ethers'
import { storeToRefs } from 'pinia'

const { t } = useI18n()
const route = useRoute()
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

definePageMeta({
  validate: (route) => {
    return utils.isAddress(route.params.eth as string)
  },
})

const ethAddress = computed(() => utils.getAddress(route.params.eth as string))

const loadMore = async () => {
  await ticketStore.fetchTickets(ethAddress.value)
}

const firstLoad = async () => {
  await ticketStore.init(ethAddress.value)
  await loadMore()
}

const claimTickets = async (ticketId: BigNumber) => {
  await ticketStore.claimTickets([ticketId])
  await ticketStore.refreshTicket(ticketId)
}

onMounted(async () => {
  await firstLoad()
})

onUnmounted(() => {
  ticketStore.clear()
})
</script>
