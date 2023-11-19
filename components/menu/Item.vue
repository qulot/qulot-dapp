<template>
  <div
    v-if="item"
    class="relative transition duration-150 ease-out text-[17px] leading-tight hover:text-main p-2 lg:px-3"
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
      :is="item.href ? NuxtLink : 'div'"
      v-else
      v-bind="getItemProps(item)"
      :class="{ active: isActive }"
    >
      <svg-icon v-if="item.icon" class="w-4 h-4 mr-2" :name="item.icon" />
      {{ item.text }}
    </component>
  </div>
</template>
<script setup lang="ts">
const NuxtLink = resolveComponent('NuxtLink')
const $route = useRoute()
const props = defineProps({
  item: {
    type: Object,
    default: () => null,
  },
  horizontal: {
    type: Boolean,
    default: false,
  },
})

const isActive = computed(() => {
  if (props.item.href?.startsWith('#')) {
    return $route.hash === props.item.href
  } else {
    return (
      props.item.href?.startsWith('#') || $route.fullPath === props.item.href
    )
  }
})

const className = computed(() => {
  const arrClass = []
  if (isActive.value) {
    arrClass.push('text-main font-bold')
  }
  props.horizontal ? arrClass.push('py-[22px]') : arrClass.push('px-4 py-1.5')
  return arrClass.join(' ')
})

const isLink = (item: any) => !!item.href
const getItemProps = (item: any) => {
  const itemProps: any = { class: [] as string[], to: '' }
  if (item.active) {
    itemProps.class.push('active')
  }
  if (isLink(item)) {
    itemProps.to = item.href || '#'
  }
  if (item.title) {
    itemProps.title = item.title
  }
  return itemProps
}
</script>
