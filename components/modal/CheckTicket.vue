<template>
  <Modal
    v-model="showValue"
    :title="$t('ticket.checkYourTicket')"
    header-class="px-6 py-4 border-b border-[#D8D8D8]"
    body-class="flex justify-center flex-col px-6 py-4 border-b border-[#D8D8D8] space-y-4"
    footer-class="flex justify-center space-x-2 px-6 py-4"
  >
    <template #body>
      <!-- Round result -->
      <div>
        <h4 class="text-sm text-main font-bold mb-2">
          {{
            $t('round.label', {
              round: round.id,
              date: formatTimestamp(round.startTime, 'mmddyyyy'),
            })
          }}
        </h4>
        <h5 class="mb-2 dark:text-white">{{ $t('round.winningNumber') }}:</h5>
        <div v-if="round.winningNumbers" class="flex items-center space-x-2">
          <div v-for="(num, i) in round.winningNumbers" :key="i">
            <BallItem :number="num" />
          </div>
        </div>
      </div>

      <!-- User ticket number -->
      <div>
        <h4 class="text-sm text-main font-bold mb-2">
          {{ $t('ticket.pickInYourTicket') }}
        </h4>
        <div class="flex flex-wrap items-center gap-2">
          <BallItem
            v-for="(num, i) in lottery.maxValuePerItem"
            :key="i"
            :number="num"
            :disable="ticket.length > 0 ? ticket.indexOf(num) === -1 : true"
            class="w-10 h-10 cursor-pointer"
            @click="pickNumber(num)"
          />
        </div>
      </div>

      <!-- User prize -->
      <div class="space-y-2">
        <h4 class="text-sm text-main font-bold">{{ $t('ticket.youWon') }}</h4>
        <div class="flex items-center justify-between dark:text-white">
          <h5>{{ $t('ticket.matchNumber', { match: matchNumber }) }}</h5>
          <TokenValue
            :value="wonValue"
            class="font-bold text-error"
            show-symbol
          />
        </div>
      </div>
    </template>
    <template #footer>
      <Button
        type="link"
        variant="primary"
        rounded
        :to="localePath({ name: 'eth-tickets', params: { eth: address } })"
        :disabled="wonValue.lte(0) || !isConnected"
      >
        {{ $t('ticket.claimTicketNow') }}
      </Button>
    </template>
  </Modal>
</template>
<script setup lang="ts">
import { BigNumber } from 'ethers'
import { Lottery, Round } from '~~/types/lottery'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  lottery: {
    type: Object as PropType<Lottery>,
    default: () => {},
  },
  round: {
    type: Object as PropType<Round>,
    default: () => {},
  },
})

const emit = defineEmits<{
  (e: 'update:show', show: boolean): void
  (e: 'confirm', show: number[]): void
}>()

const localePath = useLocalePath()
const { isConnected, address } = useAccount()

const ticket = ref<number[]>([])

const showValue = computed({
  get() {
    return props.show
  },
  set(value) {
    emit('update:show', value)
  },
})

const pickNumber = (num: number) => {
  const index = ticket.value.length > 0 ? ticket.value.indexOf(num) : -1
  if (index > -1) {
    ticket.value.splice(index, 1)
  } else if (ticket.value.length < props.lottery.numberOfItems) {
    ticket.value.push(num)
  }
}

const matchNumber = computed(() => {
  return ticket.value.filter((ticketNumber) =>
    props.round.winningNumbers.find(
      (roundNumber) => ticketNumber === roundNumber
    )
  ).length
})

const wonValue = computed(() => {
  let wonRewardValue = BigNumber.from('0')
  if (matchNumber.value > 0) {
    const matchRewardRule = props.lottery.rewardRules?.find(
      (rewardRule) => rewardRule.matchNumber === matchNumber.value
    )

    if (matchRewardRule) {
      const roundTotalAmount = BigNumber.from(props.round.totalAmount)
      const totalFeePercent =
        props.lottery.amountInjectNextRoundPercent +
        props.lottery.treasuryFeePercent

      const rewardAmount = roundTotalAmount.sub(
        roundTotalAmount.mul(totalFeePercent).div(100)
      )

      wonRewardValue = rewardAmount
        .mul(BigNumber.from(matchRewardRule.rewardValue))
        .div(100)
    }
  }

  return wonRewardValue
})
</script>
