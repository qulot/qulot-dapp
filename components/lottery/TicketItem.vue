<template>
  <div class="relative text-sm text-title-nodark">
    <div
      class="overflow-hidden box-border relative before:content-[''] before:absolute before:h-3 before:w-3 before:rounded-full before:bg-white dark:before:bg-block before:left-0 before:top-1/2 before:-mt-1.5 before:-ml-1.5 before:border before:border-solid after:content-[''] after:absolute after:h-3 after:w-3 after:rounded-full after:bg-white dark:after:bg-block after:right-0 after:top-1/2 after:-mr-1.5 after:-mt-1.5 after:border after:border-solid before:border-white after:border-white"
    >
      <div
        class="bg-[#F3EFFF] rounded lg:rounded-lg py-3 px-3 lg:px-4 border border-solid border-[#F3EFFF] flex flex-wrap items-center space-x-2 lg:space-y-0"
      >
        <span class="cursor-pointer" @click="$emit('select')">
          <span v-show="selected">
            <SvgIcon name="checkbox" class="w-4 h-4 text-title-nodark" />
          </span>
          <span v-show="!selected">
            <SvgIcon name="uncheck" class="w-4 h-4 text-disable" />
          </span>
        </span>
        <div class="flex items-center space-x-1 lg:space-x-2 flex-1 px-2">
          <div v-for="(num, i) in pickNumbers" :key="i">
            <BallItem :number="num" />
          </div>
        </div>
        <div
          class="w-full lg:w-auto mt-3 !mr-2 lg:!mr-0 lg:mt-0 text-sm text-title-nodark space-x-2 order-last lg:order-none flex justify-center"
        >
          <div
            class="flex items-center space-x-2 border border-[#D8D8D8] p-2 rounded"
          >
            <span>{{ formatUnits(pricePerTicket, currencyDecimals) }}</span>
            <span class="w-px h-3 bg-[#D8D8D8]"></span>
            <span>{{ currency }}</span>
          </div>
        </div>
        <div class="actions flex items-center space-x-2">
          <span class="cursor-pointer">
            <SvgIcon name="reload" class="h-4 w-4 text-title-nodark" />
          </span>
          <span class="cursor-pointer" @click="$emit('delete')">
            <SvgIcon name="trash" class="h-4 w-3 text-[#FF228C]" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { formatEther, formatUnits } from '@ethersproject/units'
import { PropType } from 'vue'

const props = defineProps({
  pickNumbers: {
    type: Array as PropType<number[]>,
    default: () => [],
  },
  currency: {
    type: String,
    required: true,
  },
  currencyDecimals: {
    type: Number,
    required: true,
  },
  pricePerTicket: {
    type: String,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['select', 'delete'])
</script>
