<template>
  <div
    class="flex items-center space-x-2"
    :class="{
      'rounded-full border dark:border-none dark:bg-slate-900 p-2': rounded,
    }"
  >
    <span
      class="rounded-full bg-white min-w-[1.5rem] min-h-[1.5rem] p-1 flex items-center justify-center"
    >
      <img :src="getChainIcon(chain)" :alt="chain.name" class="h-4 w-4" />
    </span>
    <span class="text-sm text-content overflow-ellipsis overflow-hidden">{{
      chain.name
    }}</span>
  </div>
</template>
<script setup lang="ts">
import { Chain } from '@wagmi/core'

defineProps({
  chain: {
    type: Object as PropType<Chain>,
    required: true,
  },
  rounded: {
    type: Boolean,
    required: false,
    default: () => true,
  },
})
</script>
