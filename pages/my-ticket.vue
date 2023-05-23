<template>
  <div class="container mx-auto pt-16 pb-4 lg:pb-14">
    <div
      class="rounded-lg shadow-default mt-4 lg:mt-6 p-2 lg:p-4 dark:bg-block"
    >
      <div class="text-[17px] font-bold text-title mb-4">
        {{ $t('ticket.listTicket') }}
      </div>
      <div v-if="tickets.length" class="space-y-4">
        <TicketItem
          v-for="ticket in tickets"
          :key="ticket.id.toString()"
          :ticket="ticket"
        />
      </div>
      <TicketEmpty v-else />
      <div class="w-full flex justify-center mt-4">
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
import { storeToRefs } from 'pinia'

const { t } = useI18n()
const { isConnected } = useAccount()
const config = useRuntimeConfig()
const ticketStore = useTicketStore()
const { tickets, isLoading } = storeToRefs(ticketStore)

const title = computed(
  () => `${t('ticket.listTicket')} | ${config.public.metadata.appName}`
)

useSeoMeta({
  title,
  ogTitle: title,
})

const loadMore = async () => {
  if (isConnected.value) {
    await ticketStore.fetchTickets()
  }
}

onMounted(() => {
  loadMore()
  watch(
    isConnected,
    () => {
      loadMore()
    },
    { deep: true }
  )
})
</script>
