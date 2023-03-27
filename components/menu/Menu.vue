<template>
  <div :class="horizontal ? 'flex flex-row space-x-8' : 'flex flex-col space-y-6'">
    <menu-item v-for="(item, index) in items" :key="`menu-item-${index}`" :item="item" :horizontal="horizontal" />
  </div>
</template>

<script>
export default {
  name: 'Menu',
  components: {
    MenuItem: () => import('@/components/menu/MenuItem.vue'),
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  methods: {},
}
</script>
