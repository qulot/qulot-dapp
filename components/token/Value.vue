<template>
  <component :is="tag">
    {{ valueFormatted }}
    <span v-if="showSymbol" class="text-xs">{{ token?.symbol }}</span>
  </component>
</template>
<script setup lang="ts">
import { BigNumber } from 'ethers'
import { formatUnits } from 'ethers/lib/utils.js'

const { token } = useQulot()
const config = useRuntimeConfig()

const props = defineProps({
  value: {
    type: [BigNumber, String],
    default: () => BigNumber.from('0'),
    required: false,
  },
  tag: {
    type: String,
    default: 'span',
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
  let decimals = config.public.tokenDefaultDecimals
  if (token.value) {
    decimals = token.value.decimals
  }

  return formatFloatFixed(formatUnits(props.value, decimals), props.fixed)
})
</script>
