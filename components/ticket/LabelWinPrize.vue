<template>
  <div class="text-xs font-bold text-white">
    <img src="/ticket/bg-label-winprize.svg" alt="label-winprize" />
    <span
      class="absolute inset-0 flex items-center justify-center pt-1 pr-1 shadow-[0px 4px 6px rgba(0, 0, 0, 0.25)]"
    >
      {{ !claimStatus ? $t('ticket.winprize') : $t('ticket.wasAwarded') }}
    </span>
  </div>
</template>
<script setup lang="ts">
defineProps({
  claimStatus: Boolean,
})
</script>
