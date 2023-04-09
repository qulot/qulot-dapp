<template>
    <Dropdown class="p-2  lg:px-3 gap-2" :items="item.subitems"
        :content-class="['flex', 'flex-row', 'items-center', '!space-y-0']">
        <slot>
            <span>{{ item.text }}</span>
        </slot>
        <template #item="{ data, click }">
            <DropdownSubItem :item="data" @click="click" />
        </template>
    </Dropdown>
</template>
<script setup lang="ts">
defineProps({
    item: {
        type: Object,
        default: () => ({
            subitems: []
        }),
    },
    horizontal: {
        type: Boolean,
        default: false,
    },
})
</script>
  