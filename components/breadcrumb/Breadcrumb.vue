<template>
  <div
    class="flex items-center space-x-6 text-[17px] font-bold text-title py-4 px-4 lg:py-5 lg:px-0 leading-tight"
    @click="$router.go(-1)"
  >
    <div class="text-subtitle flex items-center space-x-2 cursor-pointer">
      <svg-icon name="back" class="w-2 h-4 text-subtitle" /><span>{{ $t('labels.back') }}</span>
    </div>
    <div class="flex items-center space-x-4">
      <div v-for="(item, index) in list" :key="`item-breadcrumb-${index}`">
        <div v-if="item.name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
