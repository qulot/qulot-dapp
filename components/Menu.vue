<template>
  <div
    :class="horizontal ? 'flex flex-row space-x-8' : 'flex flex-col space-y-6'"
  >
    <MenuItem
      v-for="(item, index) in items"
      :key="`menu-item-${index}`"
      :item="item"
      :horizontal="horizontal"
    />
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
