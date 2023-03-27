<template>
  <div
    :class="[
      'tabs',
      {
        'tabs-boxed': boxed,
      },
    ]"
  >
    <nuxt-link
      :class="[
        'tab',
        {
          'tab-bordered': bordered,
          'tab-lifted': lifted,
          'tab-active': item.active,
        },
      ]"
      v-for="(item, i) in items"
      :key="i"
      :to="item.href || '#'"
      :active-class="autoActive ? 'tab-active' : ''"
      @click="$emit('itemClick', item)"
    >
      {{ item.text }}
    </nuxt-link>
  </div>
</template>
<script>
import isEmpty from "lodash.isempty";
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    bordered: {
      type: Boolean,
      default: false,
    },
    lifted: {
      type: Boolean,
      default: false,
    },
    boxed: {
      type: Boolean,
      default: false,
    },
    autoActive: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["itemClick"],
  methods: {
    isLink(item) {
      return !isEmpty(item);
    },
    getItemProps(item) {
      const props = { class: [] };
      if (item.active) {
        props.class.push("tab-active");
      }
      if (this.isLink(item)) {
        props.to = item.href || "#";
      }
      if (this.autoActive) {
        props["active-class"] = "tab-active";
      }
      return props;
    },
  },
};
</script>