<template>
  <div class="bg-white dark:bg-block shadow-default rounded-lg flex flex-col">
    <div
      class="flex flex-col flex-wrap lg:flex-row lg:flex-wrap lg:items-center justify-between px-4 py-4 border-b border-solid border-default"
    >
      <h2 class="text-[17px] font-bold text-title my-1 mr-3">
        {{ $t('round.finishedRounds') }}
      </h2>
      <div
        class="my-1 flex-1 w-full lg:w-auto filter text-sm text-black flex items-center space-x-4"
      >
        <div
          class="w-1/2 flex-1 lg:w-auto flex flex-col lg:flex-row lg:items-center lg:space-x-2"
        >
          <span class="mb-1 lg:mb-0 whitespace-nowrap">{{
            $t('round.filterByRoundLabel')
          }}</span>
          <FormKit v-model="filter.id" type="number" class="flex-1">
            <template #prefix>
              <span
                class="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                #
              </span>
            </template>
          </FormKit>
        </div>
        <div
          class="w-1/2 lg:w-auto flex flex-col lg:flex-row lg:items-center lg:space-x-2"
        >
          <span class="mb-1 lg:mb-0 whitespace-nowrap">{{
            $t('round.filterByDateLabel')
          }}</span>
          <FormKit v-model="filter.startTime" type="date" name="date" />
        </div>
      </div>
    </div>
    <div class="overflow-hidden flex-1">
      <div class="p-4 space-y-4">
        <RoundItem v-for="round in rounds" :key="round.id" :round="round" />
        <div class="w-full flex justify-center">
          <Button
            variant="primary"
            rounded
            :is-loading="isLoading"
            @click="loadMore"
          >
            {{ $t('round.loadMore') }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { PropType } from 'vue'
import { Lottery } from '~~/types/lottery'

const props = defineProps({
  lottery: {
    type: Object as PropType<Lottery>,
    required: true,
  },
})

const roundStore = useRoundStore()
const { rounds, isLoading, filter } = storeToRefs(roundStore)

roundStore.setFilter({ lottery: props.lottery.id })

const loadMore = async () => {
  roundStore.nextPage()
  await roundStore.fetchRounds()
}

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

onBeforeRouteUpdate(() => {
  roundStore.clear()
})
</script>