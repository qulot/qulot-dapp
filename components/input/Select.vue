<template>
  <div v-click-outside="hideDropdown" class="relative">
    <div
      class="flex items-center justify-between space-x-2 border border-solid border-default rounded text-sm text-title bg-transparent py-0 pl-4 pr-2 h-[47.99px] cursor-pointer placeholder:text-disable"
      :class="classLabel"
      @click="isShow = !isShow"
    >
      <slot name="label" :label="itemSelected">
        <span :class="title === placeholder ? 'text-[#A8A8A8]' : ''">{{
          title
        }}</span>
      </slot>
      <svg-icon name="arrow-left" class="-rotate-90 h-4 w-4" />
    </div>
    <div
      v-if="options && options.length > 0 && isShow"
      class="absolute right-0 top-full mt-2 py-2 bg-white text-title-nodark min-w-full shadow-default text-sm rounded z-50"
    >
      <div
        v-for="(item, index) in options"
        :key="`item-${index}`"
        class="px-4 py-1 cursor-pointer hover:text-main min-w-fit whitespace-nowrap"
        @click="changeValue(item.value)"
      >
        <slot name="option" :option="item">{{ item.title }}</slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
export interface SelectItem {
  title?: string
  value?: string
}

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: null,
  },
  options: {
    type: Array<SelectItem>,
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
})

const emit = defineEmits(['input'])

const isShow = ref(false)
const newValue = ref()

const itemSelected = computed(() =>
  props.options
    ? props.options.find((item) => props.modelValue === newValue.value)
    : null
)

const title = computed(() => {
  const selected = props.options.find(
    (item) => props.modelValue === newValue.value
  )
  const titleSelected = selected ? selected.title : ''
  return titleSelected || props.placeholder
})

const changeValue = (value: any) => {
  emit('input', value)
  isShow.value = false
}

const hideDropdown = () => {
  isShow.value = false
}
</script>
