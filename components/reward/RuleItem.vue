<template>
  <div>
    <h4 class="font-bold text-main">Match {{ rule.matchNumber }}</h4>
    <span class="dark:text-white"> {{ rule.rewardValue }}% </span>
  </div>
</template>
<script setup lang="ts">
import { RewardRule } from '~~/types/lottery'

defineProps({
  rule: {
    type: Object as PropType<RewardRule>,
    required: true,
  },
})
</script>
