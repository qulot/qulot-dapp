<template>
  <div>
    <h4 class="font-bold text-main">
      {{ $t('rewardRule.match', { numbers: rule.matchNumber }) }}
    </h4>
    <span class="text-content font-bold"> {{ rule.rewardValue }}% </span>
    <slot></slot>
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
