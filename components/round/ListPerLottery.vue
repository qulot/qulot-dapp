<template>
  <div class="bg-white dark:bg-block shadow-default rounded-lg">
    <!-- Round header -->
    <div class="px-4 py-4 border-b border-solid border-default">
      <h2 class="text-[17px] font-bold text-title my-1 mr-3">
        {{ $t('round.finishedRounds') }}
      </h2>
      <div
        class="my-1 filter text-sm text-black grid grid-flow-col grid-cols-2 gap-2"
      >
        <!-- Filter round id -->
        <FormKit
          v-model="filter.id"
          type="number"
          min="1"
          :label="$t('round.filterByRoundLabel')"
          :classes="{
            label: 'text-base font-normal',
            input: 'pl-1',
          }"
        >
          <template #prefixIcon="context">
            <div
              :class="context.classes.prefixIcon"
              class="items-center justify-end w-6"
            >
              <span>#</span>
            </div>
          </template>
        </FormKit>

        <!-- Filter round start date -->
        <FormKit
          v-model="filter.startTime"
          type="date"
          name="date"
          :label="$t('round.filterByDateLabel')"
          :classes="{
            label: 'text-base font-normal',
          }"
        />
      </div>
    </div>

    <!-- Round list -->
    <div class="overflow-hidden flex-1">
      <div class="p-4 space-y-4">
        <RoundItem
          v-for="round in rounds"
          :key="round.id"
          :round="round"
          @check-ticket="checkTicket(round)"
        />
        <RoundSkeletonItem v-show="isLoading" />
        <div class="w-full flex justify-center">
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
    <ModalCheckTicket
      v-if="lottery && checkTicketOnRound"
      v-model:show="showCheckTicketModal"
      :lottery="lottery"
      :round="checkTicketOnRound"
    />
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Round } from '~~/types/lottery'

const props = defineProps({
  lotteryId: {
    type: String,
    required: true,
  },
  roundId: {
    type: [String, Number],
    required: false,
    default: () => null,
  },
})

const roundStore = useRoundStore()
const lotteryStore = useLotteryStore()
const { rounds, isLoading, filter } = storeToRefs(roundStore)
const { lottery } = storeToRefs(lotteryStore)
const showCheckTicketModal = ref(false)
const checkTicketOnRound = ref<Round>()

const loadMore = async () => {
  roundStore.nextPage()
  await roundStore.fetchRounds()
}

const checkTicket = (round: Round) => {
  checkTicketOnRound.value = round
  showCheckTicketModal.value = true
}

roundStore.clear()
roundStore.setFilter({ lottery: props.lotteryId, id: props.roundId as string })

onMounted(async () => {
  await roundStore.fetchRounds()
})

watch(
  filter,
  async () => {
    roundStore.clear()
    await roundStore.fetchRounds()
  },
  { deep: true }
)
</script>
