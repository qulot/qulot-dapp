<template>
  <div class="relative" v-click-outside="hideDropdown">
    <div class="cursor-pointer" @click="isShow = !isShow">
      <slot></slot>
    </div>
    <div
      v-if="items.length > 0 && isShow"
      :class="[
        'absolute right-0 top-full mt-2 py-2 bg-white text-title-nodark min-w-full shadow-default text-sm rounded z-50',
        ...contentClass,
      ]"
    >
      <div
        v-for="(item, index) in items"
        :key="`item-${index}`"
        @click="handleClick(item)"
        class="px-4 py-1 cursor-pointer hover:text-main min-w-fit whitespace-nowrap"
        :class="contentMenuClass"
      >
        <slot name="item" v-bind:option="item">
          <div class="flex items-center">
            <svg-icon v-if="item.icon" :name="item.icon" class="w-4 h-4 mr-2" /><span>{{ item.text }}</span>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  emits: ['item-click'],
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    positions: {
      type: Array,
      default: () => [],
    },
    contentClass: {
      type: [Array],
      default: () => [],
    },
    contentMenuRounded: {
      type: Boolean,
      default: true,
    },
    contentMenuClass: {
      type: [String, Object, Array],
    },
  },
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    hideDropdown() {
      this.isShow = false
    },
    validateURL(link) {
      return link.indexOf('http://') === 0 || link.indexOf('https://') === 0
    },
    handleClick(item) {
      this.$emit('item-click', item)
      this.hideDropdown()
      if (item.href) {
        if (this.validateURL(item.href)) {
          window.open(item.href, '_blank')
        } else {
          this.$router.push(item.href)
        }
      }
    },
  },
}
</script>
