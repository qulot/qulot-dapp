<template>
  <div v-click-outside="hideDropdown" class="relative">
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
        class="px-4 py-1 cursor-pointer hover:text-main min-w-fit whitespace-nowrap"
        :class="contentMenuClass"
        @click="handleClick(item)"
      >
        <slot name="item" :option="item">
          <div class="flex items-center">
            <svg-icon
              v-if="item.icon"
              :name="item.icon"
              class="w-5 h-5 mr-2 flex items-center justify-between"
            />
            <span>{{ item.text }}</span>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
export interface DropDownItem {
  icon?: string
  text?: string
  href?: string
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

const handleClick = (item: DropDownItem) => {
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
