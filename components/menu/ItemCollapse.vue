<template>
    <div class="flex flex-col justify-start">
        <div class="flex flex-row items-center justify-between" @click="isShow = !isShow">
            <MenuItem :item="item" class="" />
            <svg-icon v-if="arrow" name="chevron-left" class="h-4 w-4 duration-100 mr-2"
                :class="[{ 'rotate-180': isShow }, arrowClass]" />
        </div>
        <Collapse :show="isShow" class="w-100" v-if="item.subitems && item.subitems.length">
            <template v-for="subitem in item.subitems">
                <MenuItem :item="subitem" class="font-bold" />
                <template v-if="subitem.subitems && subitem.subitems.length" v-for="subitem1 in subitem.subitems">
                    <MenuItem :item="subitem1" />
                </template>
            </template>
        </Collapse>
    </div>
</template>
<script setup lang="ts">
defineProps({
    item: {
        type: Object,
        default: () => ({
            subitems: []
        }),
    },
    arrow: {
        type: Boolean,
        default: true,
    },
    arrowClass: {
        type: String,
        default: () => '',
    },
})

const isShow = ref(false)
</script>