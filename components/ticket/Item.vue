<template>
  <div class="relative text-sm text-title-nodark">
    <div
      class="overflow-hidden box-border relative before:content-[''] before:absolute before:h-3 before:w-3 before:rounded-full before:bg-white dark:before:bg-block before:left-0 before:top-1/2 before:-mt-1.5 before:-ml-1.5 before:border before:border-solid after:content-[''] after:absolute after:h-3 after:w-3 after:rounded-full after:bg-white dark:after:bg-block after:right-0 after:top-1/2 after:-mr-1.5 after:-mt-1.5 after:border after:border-solid"
      :class="
        ticket.winStatus
          ? 'before:border-[#FF228C] after:border-[#FF228C]'
          : 'before:border-white after:border-white'
      "
    >
      <div
        class="bg-[#F3EFFF] rounded lg:rounded-lg p-3 xl:p-4 border border-solid min-h-[100px] lg:flex items-center space-y-3 lg:space-y-0 lg:space-x-4 xl:space-x-8"
        :class="ticket.winStatus ? 'border-[#FF228C]' : 'border-[#F3EFFF]'"
      >
        <!-- 1 -->
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
                :to="{
                  name: 'lottery-id',
                  params: { id: ticket.round?.lottery?.id },
                }"
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
        <!-- 2 -->
        <div class="pl-[78px] lg:pl-0">
          <div class="space-x-1 leading-tight">
            <span class="text-[17px] font-bold text-title-nodark">{{
              formatUnits(
                ticket.round?.lottery?.pricePerTicket || '0',
                token?.decimals
              )
            }}</span>
            <span class="text-[11px] text-[#5A5A5A]">{{ token?.symbol }}</span>
          </div>
        </div>
        <div class="w-px h-10 bg-[#D8D8D8] hidden lg:block"></div>
        <!-- 3 -->
        <div
          class="lg:flex items-center space-y-2 lg:space-y-0 lg:space-x-4 pl-[78px] lg:pl-0 whitespace-nowrap"
        >
          <p>{{ $t('ticket.timeStartDial') }}</p>
          <div>
            <DatetimeCountDown
              v-if="ticketDrawTime"
              class="w-full"
              :target="ticketDrawTime"
            />
          </div>
        </div>
        <div class="w-px h-10 bg-[#D8D8D8] hidden lg:block"></div>
        <!-- 4 -->
        <div class="text-sm pl-[78px] lg:pl-0">
          <div class="mb-2 text-title-nodark">{{ $t('ticket.status') }}:</div>
          <div :class="`font-bold ${statusClass}`">{{ statusTicket }}</div>
        </div>
      </div>
    </div>
    <TicketLabelWinPrize
      v-if="ticket.winStatus"
      class="absolute -top-1 -right-3.5"
    />
  </div>
</template>
<script setup lang="ts">
import { formatUnits } from 'ethers/lib/utils.js'
import { Ticket } from '~~/types/ticket'

const props = defineProps({
  ticket: {
    type: Object as PropType<Ticket>,
    required: true,
  },
})

const { t } = useI18n()
const { token } = useQulot()

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
    const { verboseName, minValuePerItem, numberOfItems } =
      props.ticket.round.lottery
    return `${verboseName} ${minValuePerItem}/${numberOfItems}`
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
