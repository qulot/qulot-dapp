<template>
  <button
    type="button"
    :class="['text-title font-bold text-sm w-full py-4 border border-black rounded-lg', classes]"
    @click="click"
  >
    <div class="flex max-h-full w-full h-full items-center justify-center space-x-2">
      <svg-icon name="google" class="h-4 w-4" />
      <span class="btn-google-content">
        <slot />
      </span>
    </div>
  </button>
</template>
<script>
export default {
  props: {
    ['btn-class']: {
      type: String,
      default: '',
    },
  },
  emits: ['click'],
  computed: {
    classes() {
      return this.class
    },
  },
  methods: {
    click(evt) {
      this.$emit('click', evt)
    },
  },
}
</script>
