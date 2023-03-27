<template>
  <BMenu class="b-navbar" :items="items" horizontal />
</template>
<script>
import BMenu from '@/components/menu/BMenu.vue'
export default {
  components: { BMenu },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
<!-- <style lang="postcss" scoped>
:deep(li) {
  padding: 0 0.5rem 0 0.5rem;
}
:deep(a) {
  background-color: unset;
  padding: 0;
}
:deep(a.active.nuxt-link-active) {
  color: theme('colors.primary');
}
</style> -->
