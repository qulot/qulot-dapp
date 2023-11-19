<template>
  <div
    v-if="buyTicketsError"
    class="flex items-center text-error text-xs my-2 space-x-2"
  >
    <SvgIcon name="warnning" class="h-3 w-3" />
    <span
      v-html="$t('errors.' + buyTicketsError) || $t('errors.unknownError')"
    ></span>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'

const cartStore = useCartStore()
const { buyTicketsError } = storeToRefs(cartStore)
</script>
