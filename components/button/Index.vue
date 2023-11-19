<template>
  <component
    :is="type === 'link' ? NuxtLink : 'button'"
    :type="btnType"
    :to="to"
    :prefetch="linkPrefetch"
    :class="[
      'inline-flex',
      'items-center',
      'justify-center',
      'font-bold',
      'text-sm',
      'py-3',
      'px-4',
      'border',
      'whitespace-nowrap',
      'border-[rgba(27, 40, 71, 1)]',
      'disabled:border-[rgba(61, 68, 81, 0.2)]',
      'disabled:bg-[rgba(61, 68, 81, 0.2)]',
      'disabled:opacity-70',
      {
        'border-main bg-main text-white': variant == 'primary',
        'border-yellow bg-yellow text-white': variant == 'warning',
        'border-error bg-error text-white': variant == 'danger',
      },
      {
        'pointer-events-none hover:pointer-events-none': isLoading,
        'before:mr-[0.5rem] before:h-[1rem] before:w-[1rem] before:rounded-full before:border-2 before:animate-[spin_2s_linear_infinite] before:border-t-[transparent] before:border-l-[transparent] before:border-b-[currentColor] before:border-r-[currentColor]':
          isLoading,
      },
      {
        rounded: rounded,
      },
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
export type ButtonVariant = 'primary' | 'warning' | 'danger' | ''
const props = defineProps({
  type: {
    type: String as PropType<IButtonType>,
    default: 'button',
  },
  variant: {
    type: String as PropType<ButtonVariant>,
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
    type: [String, Object],
    required: false,
    default: null,
  },
  linkPrefetch: {
    type: Boolean,
    required: false,
    default: null,
  },
})

defineEmits(['click'])

const btnType = computed(() => {
  return props.type as IButtonType
})
</script>
