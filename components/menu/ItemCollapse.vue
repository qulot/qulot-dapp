<template>
  <div class="flex flex-col justify-start">
    <div
      class="flex flex-row items-center justify-between"
      @click="isShow = !isShow"
    >
      <MenuItem :item="item" class="" />
      <svg-icon
        v-if="arrow"
        name="chevron-left"
        class="h-4 w-4 duration-100 mr-2"
        :class="[{ 'rotate-180': isShow }, arrowClass]"
      />
    </div>
    <Collapse
      v-if="item.subitems && item.subitems.length"
      :show="isShow"
      class="w-100"
    >
      <template
        v-for="(subitem, index) in item.subitems"
        :key="'subitem-' + index"
      >
        <MenuItem :item="subitem" class="font-bold" />
        <template v-if="subitem.subitems && subitem.subitems.length">
          <MenuItem
            v-for="(subitem1, index1) in subitem.subitems"
            :key="'subitem1-' + index1"
            :item="subitem1"
          />
        </template>
      </template>
    </Collapse>
  </div>
</template>
<script setup lang="ts">
defineProps({
  item: {
    type: Object,
    default: () => ({
      subitems: [],
    }),
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

const isShow = ref(false)
</script>
