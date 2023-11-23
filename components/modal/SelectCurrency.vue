<template>
  <Modal
    v-model="showValue"
    header-class="px-6 py-4 border-b border-[#D8D8D8] dark:border-slate-400"
    body-class="space-y-4 min-h-[20rem] max-h-[20rem] min-w-[20rem] overflow-auto "
    :footer="false"
    size="xs"
  >
    <template #title>
      <FormKit
        type="search"
        name="currency"
        :placeholder="$t('labels.search')"
        :classes="{
          label: '$remove:text-[17px] text-main text-sm',
          input: '$remove:h-[3rem]',
        }"
        @input="onSearchCurrency"
      />
    </template>
    <template #body>
      <ul class="px-4 py-2 text-content">
        <li
          v-for="currency in currenciesResult"
          :key="currency.symbol"
          class="py-1 cursor-pointer hover:text-main"
          @click="onSelectCurrency(currency)"
        >
          <div class="flex items-center justify-between">
            <!-- Currency format -->
            <span>{{ currency.symbol }} - {{ currency.name }}</span>
            <!-- Check icon -->
            <div
              v-if="currencySetting === currency.symbol"
              class="flex items-center ml-auto"
            >
              <svg-icon name="check" class="w-5 h-5" />
            </div>
          </div>
        </li>
      </ul>
    </template>
  </Modal>
</template>
<script setup lang="ts">
import { Currency } from '~/types/exchange'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:show', 'change'])

const { currencySetting, currencies } = useCurrencies()
const search = ref()

const showValue = computed({
  get() {
    return props.show
  },
  set(value) {
    emit('update:show', value)
  },
})

const currenciesResult = computed(() => {
  if (isEmpty(search.value)) {
    return currencies
  }

  const searchLowerCase = search.value.toLowerCase()

  return currencies.filter(
    (currency) =>
      currency.symbol.toLowerCase().includes(searchLowerCase) ||
      currency.name.toLowerCase().includes(searchLowerCase)
  )
})

const onSelectCurrency = (currency: Currency) => {
  currencySetting.value = currency.symbol
  clear()
  emit('change')
}

const onSearchCurrency = (val: string) => {
  search.value = val
}

const clear = () => {
  search.value = null
}

onUnmounted(() => {
  clear()
})
</script>
