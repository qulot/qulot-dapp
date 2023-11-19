<template>
  <component :is="tag">
    {{ valueFormatted }}
    <span v-if="showSymbol && symbol" class="text-xs">{{ symbol }}</span>
  </component>
</template>
<script setup lang="ts">
import { BigNumber, utils } from 'ethers'

const props = defineProps({
  value: {
    type: [BigNumber, String, Object, Number],
    default: () => BigNumber.from('0'),
    required: false,
  },
  tag: {
    type: String,
    default: 'span',
    required: false,
  },
  symbol: {
    type: String,
    default: () => null,
    required: false,
  },
  showSymbol: {
    type: Boolean,
    default: false,
    required: false,
  },
  fixed: {
    type: Number,
    default: () => 2,
    required: false,
  },
})

const valueFormatted = computed(() => {
  return formatFloatFixed(
    utils.formatEther(props.value.toString()),
    props.fixed
  )
})
</script>
