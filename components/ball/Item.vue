<template>
  <div class="font-bold text-white relative w-8 h-8">
    <img
      v-show="disable"
      src="/ticket/ball-disable.svg"
      class="max-w-full h-auto"
      alt="ball-disable"
    />
    <img
      v-show="!disable"
      src="/ticket/ball.svg"
      class="max-w-full h-auto"
      alt="ball"
    />
    <span
      class="text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      :class="{ 'text-[#5A5A5A]': disable }"
    >
      {{ number }}
    </span>
  </div>
</template>
<script setup lang="ts">
defineProps({
  number: {
    type: Number,
    require: true,
    default: 0,
  },
  disable: {
    type: Boolean,
    default: false,
  },
})
</script>
