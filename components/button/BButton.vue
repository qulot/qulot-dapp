<template>
  <button
    :type="type"
    class="btn gap-2 whitespace-nowrap"
    :class="[
      {
        'btn-primary': variant == $theme.variants.primary,
        'btn-secondary': variant == $theme.variants.secondary,
        'btn-accent': variant == $theme.variants.accent,
        'btn-info': variant == $theme.variants.info,
        'btn-success': variant == $theme.variants.success,
        'btn-warning': variant == $theme.variants.warning,
        'btn-error': variant == $theme.variants.error,
      },
      ...computedButtonClass,
    ]"
    @click="$emit('click')"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
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
      default: false,
    },
  },
  emits: ['click'],
  computed: {
    computedButtonClass() {
      const classes = []

      if (this.isLoading) {
        classes.push('loading')
      }

      return classes
    },
  },
}
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
