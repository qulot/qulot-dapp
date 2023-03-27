<template>
  <div class="flex items-center justify-between space-x-4">
    <div class="flex-1">
      <div v-if="name" class="text-sm font-bold text-subtitle mb-4">{{ name }}</div>
      <div v-if="description" class="text-sm text-subtitle">{{ description }}</div>
    </div>
    <div class="self-end">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FieldSetting',
  props: {
    name: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
}
</script>
