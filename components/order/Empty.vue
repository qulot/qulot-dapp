<template>
  <div class="flex flex-col items-center gap-y-4">
    <img src="/cart-empty.svg" alt="Order Empty!" width="170" height="auto" />
    <h5 class="text-title">
      {{ $t('order.empty') }}
    </h5>
    <Button
      type="link"
      :to="
        localePath({
          name: 'lottery-id',
          params: { id: lotteryOpenSoon?.id },
        })
      "
      variant="primary"
      rounded
    >
      {{ $t('lottery.playNow') }}
    </Button>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'

const localePath = useLocalePath()
const lotteryStore = useLotteryStore()
const { lotteryOpenSoon } = storeToRefs(lotteryStore)
</script>
