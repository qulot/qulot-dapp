<template>
  <div class="px-4 min-w-fit whitespace-nowrap">
    <component :is="item.href ? NuxtLink : 'div'" :to="item.href"
      :class="['flex gap-x-2 py-1', { 'text-main': item.active }]" @click="handleClick">
      <span class="font-bold hover:text-main">{{ item.text }}</span>
      <div v-show="item.active" class="flex items-center ml-auto">
        <svg-icon name="check" class="w-5 h-5" />
      </div>
    </component>
    <div v-if="item.subitems && item.subitems.length">
      <template v-for="(subitem, index) in item.subitems" :key="`item-${index}`">
        <DropdownItem :item="subitem" class="!px-0" @click="$emit('click', subitem)" />
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue'

export interface DropDownSubItem {
  text?: string
  href?: string
  active?: boolean
  subitems?: DropDownSubItem[]
}

const NuxtLink = resolveComponent('NuxtLink')

const props = defineProps({
  item: {
    type: Object as PropType<DropDownSubItem>,
    required: true,
  },
})

const emit = defineEmits(['click'])

function handleClick(evt: any) {
  if (props.item.href) {
    return
  }
  emit('click', props.item)
}
</script>
