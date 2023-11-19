<template>
  <div class="space-y-4">
    <h1
      class="uppercase font-bold text-title-nodark dark:text-white text-center"
    >
      {{ $t('lotteryAbout.prizeStructure') }}
    </h1>

    <p class="text-content dark:text-white space-y-4">
      {{
        $t('lotteryAbout.howToPlayFinalPrize', {
          treasuryFee: lottery?.treasuryFeePercent,
          amountInjectNextRoundFee: lottery?.amountInjectNextRoundPercent,
        })
      }}
    </p>

    <p class="text-content dark:text-white space-y-4">
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
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Lottery } from '~/types/lottery'

defineProps({
  lottery: {
    type: Object as PropType<Lottery>,
    required: true,
  },
})
</script>
