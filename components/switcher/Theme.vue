<template>
  <label class="h-5 w-5 flex items-center justify-center text-menu cursor-pointer">
    <input type="checkbox" @change="toggle($event.target.value)" :value="theme !== 'light'" class="hidden" />
    <svg-icon :name="theme === 'light' ? 'dark' : 'light'" class="w-4 h-4" />
  </label>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  head() {
    return {
      htmlAttrs: {
        'data-theme': this.theme,
        class: this.theme == 'dark' ? 'dark' : '',
      },
    }
  },
  computed: {
    ...mapGetters({
      theme: 'theme/getTheme',
    }),
  },
  methods: {
    ...mapActions({
      toggle: 'theme/toggle',
    }),
  },
}
</script>
