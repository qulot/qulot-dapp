<template>
  <div
    v-if="item"
    class="relative transition duration-150 ease-out text-[17px] leading-tight hover:text-main"
    :class="className"
  >
    <svg-icon
      v-if="isActive && horizontal"
      name="arrow-menu"
      class="w-[80px] h-[6px] absolute -top-0 left-1/2 text-main -translate-x-1/2"
    />
    <svg-icon
      v-if="isActive && !horizontal"
      name="arrow-menu-mobile"
      class="w-[6px] h-8 absolute top-0 left-0 text-main"
    />
    <span v-if="item.title">{{ item.title }}</span>
    <component
      v-else
      :is="item.href ? 'nuxt-link' : 'div'"
      v-bind="getItemProps(item)"
      :class="{ active: isActive }"
      @click.native="$store.commit('setShowSidebarMobile', false)"
    >
      <svg-icon v-if="item.icon" class="w-4 h-4 mr-2" />
      {{ item.text }}
    </component>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    item: {
      type: Object,
      default: () => null,
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  computed: {
    isActive() {
      if (this.item.href.startsWith('#')) {
        return this.$route.hash === this.item.href
      } else {
        return this.item.href.startsWith('#') || this.$route.fullPath === this.item.href
      }
    },
    className() {
      const arrClass = []
      if (this.isActive) arrClass.push('text-main font-bold')
      this.horizontal ? arrClass.push('py-[22px]') : arrClass.push('px-4 py-1.5')
      return arrClass.join(' ')
    },
  },
  methods: {
    isLink(item) {
      return !!item.href
    },
    getItemProps(item) {
      const props = { class: [], to: '' }
      if (item.active) {
        props.class.push('active')
      }
      if (this.isLink(item)) {
        props.to = item.href || '#'
      }
      return props
    },
  },
}
</script>
