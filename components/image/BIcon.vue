<template>
  <span>
    <ion-icon :name="icon" :size="size" />
  </span>
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: "small",
    },
  },
};
</script>