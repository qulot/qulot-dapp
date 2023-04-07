<template>
  <div
    :class="
      horizontal
        ? 'flex flex-row gap-x-4 lg:gap-x-8'
        : 'flex flex-col gap-y-4 lg:gap-y-8'
    "
  >
    <slot>
      <div v-for="(item, index) in items" :key="`menu-item-${index}`">
        <slot name="item" :option="item">
          <MenuItem :item="item" :horizontal="horizontal" />
        </slot>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  items: {
    type: Array<Object>,
    default: () => [],
  },
  horizontal: {
    type: Boolean,
    default: false,
  },
})
</script>
