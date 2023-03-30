<template>
  <div class="avatar placeholder">
    <div
      class="text-red-600 font-bold rounded-full ring ring-error ring-offset-base-100 w-8"
    >
      <span class="text-xs">{{ numberTwoDigits }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  number: {
    type: Number,
    require: true,
    default: 0,
  },
})

const numberTwoDigits = computed(() => formatIntDigits(props.number, 2))
</script>
