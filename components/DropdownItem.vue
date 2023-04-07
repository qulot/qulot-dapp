<template>
    <div class="px-4 py-1 cursor-pointer hover:text-main min-w-fit whitespace-nowrap" @click="$emit('click', item)">
        <div :class="['flex gap-x-2', { 'text-main': item.active }]">
            <div v-if="item.icon" class="flex items-center w-5 h-5">
                <svg-icon :name="item.icon" class="h-full w-full" />
            </div>
            <span>{{ item.text }}</span>
            <div v-show="item.active" class="flex items-center ml-auto">
                <svg-icon name="check" class="w-5 h-5" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue';

export interface DropDownItem {
    icon?: any
    text?: string
    href?: string
    active?: boolean
}

defineProps({
    item: {
        type: Object as PropType<DropDownItem>,
        required: true
    },
})

defineEmits(['click'])
</script>