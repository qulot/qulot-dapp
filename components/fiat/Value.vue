<template>
  <component :is="tag">
    {{ valueFormatted }}
  </component>
</template>
<script setup lang="ts">
const props = defineProps({
  value: {
    type: Number,
    default: () => 0,
    required: false,
  },
  tag: {
    type: String,
    default: 'span',
    required: false,
  },
  currency: {
    type: String,
    default: () => 'USD',
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

const valueFormatted = computed(() => {
  let subunitsToUnit = props.subunitsToUnit
  if (props.currency === 'USD') {
    subunitsToUnit = 100
  }

  const valueFormatted = formatFiatMoney(
    props.value,
    'en',
    props.currency,
    props.subunitsValue,
    subunitsToUnit,
    props.hideSubunits,
    props.supplementalPrecision
  )

  return valueFormatted
})
</script>
