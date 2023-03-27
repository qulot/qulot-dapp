<template>
  <div class="relative" v-click-outside="hideDropdown">
    <div
      class="
        flex
        items-center
        justify-between
        space-x-2
        border border-solid border-default
        rounded
        text-sm text-title
        bg-transparent
        py-0
        pl-4
        pr-2
        h-[47.99px]
        cursor-pointer
        placeholder:text-disable
      "
      :class="classLabel"
      @click="isShow = !isShow"
    >
      <slot name="label" v-bind:label="itemSeleted">
        <span :class="title === placeholder ? 'text-[#A8A8A8]' : ''">{{ title }}</span>
      </slot>
      <svg-icon name="arrow-left" class="-rotate-90 h-4 w-4" />
    </div>
    <div
      v-if="options && options.length > 0 && isShow"
      class="
        absolute
        right-0
        top-full
        mt-2
        py-2
        bg-white
        text-title-nodark
        min-w-full
        shadow-default
        text-sm
        rounded
        z-50
      "
    >
      <div
        v-for="(item, index) in options"
        :key="`item-${index}`"
        @click="changeValue(item.value)"
        class="px-4 py-1 cursor-pointer hover:text-main min-w-fit whitespace-nowrap"
      >
        <slot name="option" v-bind:option="item">{{ item.title }}</slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: {
    value: {
      type: [String, Number],
      default: null,
    },
    options: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: 'Select option',
    },
    classLabel: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isShow: false,
    }
  },
  computed: {
    itemSeleted() {
      return this.options ? this.options.find((item) => item.value === this.value) : null
    },
    title() {
      const itemSeleted = this.options.find((item) => item.value === this.value)
      const titleSelected = itemSeleted ? itemSeleted.title : ''
      return titleSelected || this.placeholder
    },
  },
  methods: {
    changeValue(value) {
      this.$emit('input', value)
      this.isShow = false
    },
    hideDropdown() {
      this.isShow = false
    },
  },
}
</script>
