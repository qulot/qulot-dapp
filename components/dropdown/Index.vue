<template>
    <div v-click-outside="hideDropdown" class="relative cursor-pointer flex items-center gap-2" @click="isShow = !isShow">
      <slot></slot>
      <svg-icon v-if="arrow" name="chevron-left" class="h-4 w-4 duration-100" :class="[{ 'rotate-180': isShow }, arrowClass]" />
      <div v-if="items.length > 0" :class="[
        'absolute right-0 top-full mt-2 py-2 bg-white text-title-nodark min-w-full shadow-default text-sm rounded z-50 space-y-1',
        { 'hidden': !isShow },
        ...contentClass,
      ]">
        <template v-for="(item, index) in items" :key="`item-${index}`">
          <slot name="item" v-bind="{ data: item, click }">
            <DropdownItem :item="item" :class="contentMenuClass" @click="click(item)" />
          </slot>
        </template>
      </div>
    </div>
  </template>
  <script setup lang="ts">
  export interface DropDownItem {
    icon?: string
    text?: string
    href?: string
    active?: boolean
  }
  
  defineProps({
    items: {
      type: Array<DropDownItem | any>,
      default: () => [],
    },
    contentClass: {
      type: [Array],
      default: () => [],
    },
    contentMenuClass: {
      type: [String, Object, Array],
      default: () => '',
    },
    arrow: {
      type: Boolean,
      default: true,
    },
    arrowClass: {
      type: String,
      default: () => '',
    },
  })
  
  const emit = defineEmits(['item-click'])
  
  const router = useRouter()
  const isShow = ref(false)
  
  const hideDropdown = () => {
    isShow.value = false
  }
  
  const validateURL = (link: string) =>
    link.indexOf('http://') === 0 || link.indexOf('https://') === 0
  
  const click = (item: DropDownItem) => {
    emit('item-click', item)
    hideDropdown()
    if (item.href) {
      if (validateURL(item.href)) {
        window.open(item.href, '_blank')
      } else {
        router.push(item.href)
      }
    }
  }
  </script>
  