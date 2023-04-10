<template>
    <component :is="tag" v-show="show" class="transition duration-100">
        <slot></slot>
    </component>
</template>
<script setup lang="ts">
defineProps({
    show: {
        type: Boolean,
        default: true,
    },
    tag: {
        type: String,
        default: "div"
    }
})
</script>