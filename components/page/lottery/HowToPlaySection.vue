<template>
  <div class="space-y-4">
    <h1
      class="uppercase font-bold text-title-nodark dark:text-white text-center"
    >
      {{ $t('lottery.howToPlay') }}
    </h1>
    <p class="text-content dark:text-white space-y-4">
      {{
        $t('lotteryAbout.howToPlayPickNumber', {
          minNumber: lottery?.minValuePerItem,
          maxNumber: lottery?.maxValuePerItem,
          numberOfItems: lottery?.numberOfItems,
        })
      }}
    </p>
    <p class="text-content dark:text-white space-y-4">
      <i18n-t tag="p" keypath="lotteryAbout.howToPlayPrice">
        <template #ticketPrice>
          <TokenValue :value="lottery?.pricePerTicket" tag="span" show-symbol />
        </template>
      </i18n-t>
    </p>
  </div>
</template>
<script lang="ts" setup>
import { Lottery } from '~/types/lottery'

defineProps({
  lottery: {
    type: Object as PropType<Lottery>,
    required: true,
  },
})
</script>
