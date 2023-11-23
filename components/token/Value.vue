<template>
  <component :is="tag">
    {{ valueFormatted }}
    <span v-if="showSymbol" class="text-xs">{{ symbol }}</span>
  </component>
</template>
<script setup lang="ts">
import { BigNumber, utils } from 'ethers'

const { token } = useQulot()
const { exchangeToken } = useExchange()
const { currencySetting } = useCurrencies()
const config = useRuntimeConfig()

const props = defineProps({
  value: {
    type: [BigNumber, String, Object, Number],
    default: () => BigNumber.from('0'),
    required: false,
  },
  tag: {
    type: String,
    default: 'span',
    required: false,
  },
  showSymbol: {
    type: Boolean,
    default: false,
    required: false,
  },
  fixed: {
    type: Number,
    default: () => 2,
    required: false,
  },
  useFiatValue: {
    type: Boolean,
    default: false,
    required: false,
  },
  currency: {
    type: String,
    default: null,
    required: false,
  },
  supplementalPrecision: {
    type: Number,
    default: () => 0,
    required: false,
  },
  subunitsValue: {
    type: Boolean,
    default: () => false,
    required: false,
  },
  subunitsToUnit: {
    type: Number,
    default: 1,
  },
  hideSubunits: {
    type: Boolean,
    default: () => false,
    required: false,
  },
})

const getTokenDecimals = () => {
  let decimals = config.public.tokenDefaultDecimals
  if (token.value) {
    decimals = token.value.decimals
  }
  return decimals
}

const getCurrency = () => {
  if (props.currency) {
    return props.currency
  }

  if (currencySetting.value) {
    return currencySetting.value
  }

  return 'USD'
}

const verboseTokenValue = () => {
  const decimals = getTokenDecimals()

  return formatFloatFixed(
    utils.formatUnits(BigNumber.from(props.value), decimals),
    props.fixed
  )
}

const verboseTokenAsFiatValue = async () => {
  const decimals = getTokenDecimals()
  const parsedTokenValue = utils.formatUnits(
    BigNumber.from(props.value),
    decimals
  )

  const currency = getCurrency()

  const tokenValueAsFiat = await exchangeToken(
    token.value.symbol,
    currency,
    Number(parsedTokenValue)
  )

  const valueFormatted = formatFiatMoney(
    tokenValueAsFiat || 0,
    'en',
    currency,
    props.subunitsValue,
    props.subunitsToUnit,
    props.hideSubunits,
    props.supplementalPrecision
  )

  return valueFormatted
}

const [valueFormatted] = useAsyncComputed(async () => {
  if (props.useFiatValue && token.value) {
    return await verboseTokenAsFiatValue()
  }

  return verboseTokenValue()
})

const symbol = computed(() => {
  if (props.useFiatValue && token.value) {
    return props.currency
  }

  return token.value?.symbol
})
</script>
