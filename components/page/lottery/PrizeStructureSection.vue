<template>
  <div class="space-y-4">
    <h1
      class="uppercase font-bold text-title-nodark dark:text-white text-center"
    >
      {{ $t('lotteryAbout.prizeStructure') }}
    </h1>

    <p class="text-content space-y-4">
      {{
        $t('lotteryAbout.howToPlayFinalPrize', {
          treasuryFee: lottery?.treasuryFeePercent,
          amountInjectNextRoundFee: lottery?.amountInjectNextRoundPercent,
        })
      }}
    </p>

    <p class="text-content space-y-4">
      {{ $t('lotteryAbout.howToPlayMatchWiningNumbers') }}
    </p>
    <div
      v-if="lottery?.rewardRules"
      class="grid grid-flow-col auto-cols-auto gap-2 lg:gap-4"
    >
      <RewardRuleItem
        v-for="rewardRule in lottery.rewardRules"
        :key="rewardRule.matchNumber"
        :rule="rewardRule"
      >
        <br />
        <!-- Win rate -->
        <span class="text-sm text-content">
          {{ $t('rewardRule.rate', { rate: '1/' + calcWinRate(rewardRule) }) }}
        </span>
      </RewardRuleItem>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Lottery, RewardRule } from '~/types/lottery'

const props = defineProps({
  lottery: {
    type: Object as PropType<Lottery>,
    required: true,
  },
})

const calcWinRate = (rewardRule: RewardRule) => {
  return combination(props.lottery.maxValuePerItem, rewardRule.matchNumber)
}
</script>
