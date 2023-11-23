<template>
  <div
    class="flex items-center cursor-pointer space-x-2"
    @click="openModalSelectCurrency"
  >
    <svg-icon name="dolla" class="w-4 h-4" />
    <span :class="labelClass">
      {{ currencySetting }}
    </span>
  </div>
</template>
<script setup lang="ts">
import { ModalSelectCurrency } from '#components'

defineProps({
  labelClass: {
    type: Array as PropType<string[]>,
    required: false,
    default: () => ['block', 'capitalize'],
  },
})

const { currencySetting } = useCurrencies()
const { open: openModalSelectCurrency, close: closeModalSelectCurrency } =
  useModal({
    component: ModalSelectCurrency,
    attrs: {
      onChange() {
        closeModalSelectCurrency()
      },
    },
  })
</script>
