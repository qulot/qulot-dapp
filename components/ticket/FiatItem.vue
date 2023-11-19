<template>
  <div class="relative text-sm text-title-nodark">
    <div
      class="overflow-hidden box-border relative before:content-[''] before:absolute before:h-3 before:w-3 before:rounded-full before:bg-white dark:before:bg-block before:left-0 before:top-1/2 before:-mt-1.5 before:-ml-1.5 before:border before:border-solid after:content-[''] after:absolute after:h-3 after:w-3 after:rounded-full after:bg-white dark:after:bg-block after:right-0 after:top-1/2 after:-mr-1.5 after:-mt-1.5 after:border after:border-solid before:border-white after:border-white"
    >
      <div
        class="bg-[#F3EFFF] rounded lg:rounded-lg p-4 border border-solid min-h-[100px] lg:flex items-center space-y-3 lg:space-y-0 lg:space-x-4 xl:space-x-8 border-[#F3EFFF]"
      >
        <!-- Lottery info -->
        <div class="flex items-center">
          <div class="w-[70px] h-[70px] rounded overflow-hidden mr-2 lg:mr-4">
            <img
              class="inset-0"
              :src="ticket.round?.lottery?.picture"
              alt="thumbnail"
            />
          </div>
          <div>
            <div class="mb-3">
              <NuxtLink
                class="text-[17px] font-bold text-title-nodark leading-tight"
                :to="
                  localePath({
                    name: 'lottery-id',
                    params: { id: ticket.round?.lottery?.id || 'liteq' },
                    query: { roundId: ticket.round?.id },
                  })
                "
              >
                {{ lotteryName }} ❘
                {{ $t('round.roundId', { round: ticket.round?.id }) }}
              </NuxtLink>
            </div>
            <div class="flex items-center space-x-2">
              <div v-for="(num, i) in ticket.numbers" :key="i">
                <BallItem :number="num" :disable="!checkMatchBall(num)" />
              </div>
            </div>
          </div>
        </div>
        <div class="w-px h-10 bg-[#D8D8D8] hidden lg:block lg:!ml-auto"></div>
        <!-- Ticket price -->
        <div class="lg:pl-0">
          <div class="space-x-1 leading-tight">
            <TokenValue
              :value="ticket.round?.lottery?.pricePerTicket"
              :fixed="1"
              show-symbol
              class="font-bold text-title-nodark"
            />
          </div>
        </div>
        <div class="w-px h-10 bg-[#D8D8D8] hidden lg:block"></div>
        <!-- Count down -->
        <div
          class="lg:flex items-center space-y-2 lg:space-y-0 lg:space-x-4 lg:pl-0 lg:min-w-[280px]"
        >
          <template v-if="ticket.round?.status === 'Open'">
            <p>{{ $t('ticket.timeStartDial') }}</p>
            <div>
              <DatetimeCountDown
                v-if="ticketDrawTime"
                class="w-full"
                :target="ticketDrawTime"
              />
            </div>
          </template>
          <template v-else>
            <div class="">
              {{ $t('ticket.youWon') }}:
              <TokenValue
                ref="rewardBtn"
                :value="ticket.winAmount"
                show-symbol
                class="text-[17px] font-bold text-error cursor-pointer inline-block"
              />
            </div>
          </template>
        </div>
        <div class="w-px h-10 bg-[#D8D8D8] hidden lg:block"></div>
        <!-- 4 -->
        <div class="text-sm lg:pl-0 lg:w-[55px]">
          <div class="text-title-nodark">
            {{ $t('ticket.status') }}:
            <span :class="`font-bold ${statusClass}`">{{ statusTicket }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Ticket } from '~~/types/ticket'

const props = defineProps({
  ticket: {
    type: Object as PropType<Ticket>,
    required: true,
  },
})

const { t } = useI18n()
const localePath = useLocalePath()

const statusTicket = computed(() => {
  switch (props.ticket.round?.status) {
    case 'Open':
      return t('ticket.statusWait')
    case 'Draw':
      return t('ticket.statusStartDial')
    case 'Reward':
      return t('ticket.statusFinished')
    case 'Close':
      return t('ticket.statusStartReward')
  }
})

const statusClass = computed(() => {
  switch (props.ticket.round?.status) {
    case 'Open':
      return 'text-yellow'
    case 'Draw':
      return 'text-main'
    case 'Close':
      return 'text-[#FF228C]'
    case 'Reward':
      return 'text-disable'
  }
})

const lotteryName = computed(() => {
  if (props.ticket.round?.lottery) {
    const { verboseName, maxValuePerItem, numberOfItems } =
      props.ticket.round.lottery
    return `${verboseName} ${numberOfItems}/${maxValuePerItem}`
  }
})

const ticketDrawTime = computed(() => {
  if (props.ticket.round?.status === 'Reward') {
    return timestampToDateTime(props.ticket.round.endTime)
  }

  if (
    props.ticket.round?.lottery?.periodDays &&
    props.ticket.round?.lottery?.periodHourOfDays
  ) {
    return nextTickOf(
      props.ticket.round.lottery.periodDays,
      props.ticket.round.lottery.periodHourOfDays
    )
  }
})

const checkMatchBall = (pickNumber: number) => {
  if (props.ticket.round?.status === 'Reward') {
    return props.ticket.round?.winningNumbers?.includes(pickNumber)
  }
  return true
}
</script>
