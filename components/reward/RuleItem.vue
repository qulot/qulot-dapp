<template>
  <div>
    <h4 class="font-bold text-main">Match {{ rule.matchNumber }}</h4>
    <span v-if="rule.rewardUnit === 'Percent'" class="dark:text-white">
      {{ formatUnits(rule.rewardValue, token?.decimals) }}%
    </span>
  </div>
</template>
<script setup lang="ts">
import { formatUnits } from 'ethers/lib/utils.js'
import { RewardRule } from '~~/types/lottery'
const { token } = useQulot()

defineProps({
  rule: {
    type: Object as PropType<RewardRule>,
    required: true,
  },
})
</script>
