<template>
  <div class="flex justify-between items-center mb-4 lg:mb-6">
    <div class="flex items-center gap-x-2">
      <component :is="tag" class="text-2xl font-bold text-black lg:text-4xl" v-bind="titleProps">
        {{ title }}
      </component>
      <slot name="icon">
        <img v-if="title === '1st platform of its kind'" src="/platform/crown.svg" :alt="title" />
        <img v-else-if="title === 'Team  & partners'" src="/team/handbag.svg" :alt="title" />
      </slot>
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
    default: () => { }
  },
  tag: {
    type: String,
    default: 'h1'
  },
})
</script>
