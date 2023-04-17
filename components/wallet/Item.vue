<template>
  <div
    class="flex flex-col items-center gap-y-2 cursor-pointer duration-100 hover:opacity-70"
  >
    <div
      class="flex items-center justify-center w-[64px] h-[64px] p-3 rounded bg-[#E1E1E1]"
    >
      <img :src="icon" :alt="name" class="h-100 w-auto" />
    </div>
    <span class="text-sm text-dark dark:text-white text-center">{{
      name
    }}</span>
  </div>
</template>
<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
})
</script>
