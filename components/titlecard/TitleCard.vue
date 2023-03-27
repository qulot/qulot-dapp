<template>
  <div class="flex justify-between items-center mb-4 lg:mb-6">
    <div class="flex items-center gap-x-2">
      <h1 class="text-2xl font-bold text-black lg:text-4xl">
        {{ title }}
      </h1>
      <slot name="icon">
        <img v-if="title === '1st platform of its kind'" src="~/static/platform/crown.svg" :alt="title" />
        <img v-else-if="title === 'Team  & partners'" src="~/static/team/handbag.svg" :alt="title" />
      </slot>
    </div>
    <slot name="action"></slot>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>
