<template>
  <div class="flex justify-between items-center mb-4 lg:mb-6">
    <div class="flex items-center gap-x-2">
      <component
        :is="tag"
        class="text-2xl font-bold text-black lg:text-4xl"
        v-bind="titleProps"
      >
        {{ title }}
      </component>
      <slot name="icon"> </slot>
    </div>
    <slot name="action"></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: '',
  },
  titleProps: {
    type: Object,
    default: () => {},
  },
  tag: {
    type: String,
    default: 'h1',
  },
})
</script>
