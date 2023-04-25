<template>
  <component
    :is="type === 'link' ? NuxtLink : 'button'"
    :type="btnType"
    :to="to"
    class="btn whitespace-nowrap"
    :class="[
      {
        'btn-primary': variant == 'primary',
        'btn-secondary': variant == 'secondary',
        'btn-accent': variant == 'accent',
        'btn-info': variant == 'info',
        'btn-success': variant == 'success',
        'btn-warning': variant == 'warning',
        'btn-error': variant == 'error',
      },
      ...computedButtonClass,
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </component>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { NuxtLink } from '#components'

export type IButtonType = 'button' | 'submit' | 'reset' | 'link'
const props = defineProps({
  type: {
    type: String as PropType<IButtonType>,
    default: 'button',
  },
  variant: {
    type: String,
    default: '',
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    required: false,
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  to: {
    type: String,
    required: false,
    default: null,
  },
})

defineEmits(['click'])

const computedButtonClass = computed(() => {
  const classes = []

  if (props.isLoading) {
    classes.push('loading')
  }

  if (props.rounded) {
    classes.push('rounded')
  }

  return classes
})

const btnType = computed(() => {
  return props.type as IButtonType
})
</script>
<style lang="postcss" scoped>
.btn {
  text-transform: initial;
}

.btn > svg,
.btn > image {
  max-height: 40%;
}
</style>
