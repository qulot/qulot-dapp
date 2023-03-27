<template>
  <ul
    :class="[
      'menu',
      {
        'rounded-box': rounded,
        'menu-horizontal': horizontal,
        'menu-compact': compact,
      },
    ]"
  >
    <li v-for="(item, i) in items" :key="i" :class="[isTitle(item) ? 'menu-title' : '']">
      <span v-if="isTitle(item)">{{ item.title }}</span>
      <component
        v-else
        :is="isLink(item) ? 'nuxt-link' : 'button'"
        @click="$emit('item-click', item)"
        v-bind="getItemProps(item)"
        class="font-normal text-[17px]"
      >
        <div v-if="hasIcon(item)" class="h-5 w-5" v-html="item.icon"></div>
        {{ item.text }}
      </component>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
    compact: {
      type: Boolean,
      default: false,
    },
    autoActive: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['item-click'],
  methods: {
    isTitle(item) {
      return !!item.title
    },
    isLink(item) {
      return !!item.href
    },
    hasIcon(item) {
      return !!item.icon
    },
    getItemProps(item) {
      const props = { class: [] }
      if (item.active) {
        props.class.push('active')
      }
      if (this.isLink(item)) {
        props.to = item.href || '#'
      }
      if (this.autoActive) {
        props['exact-active-class'] = 'active'
      }
      return props
    },
  },
}
</script>
