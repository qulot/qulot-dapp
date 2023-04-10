<template>
  <div class="flex" :class="
    horizontal
      ? 'flex-row'
      : 'flex-col'
  ">
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
