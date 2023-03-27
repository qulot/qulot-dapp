<template>
  <div class="avatar placeholder">
    <div
      class="
        text-red-600
        font-bold
        rounded-full
        ring ring-error ring-offset-base-100
        w-8
      "
    >
      <span class="text-xs">{{ numberTwoDigits }}</span>
    </div>
  </div>
</template>
<script>
import { formatIntDigits } from '@/utils/number';

export default {
  props: {
    number: {
      type: Number,
      require: true,
      default: 0,
    },
  },
  computed: {
    numberTwoDigits() {
      return formatIntDigits(this.number, 2)
    },
  },
};
</script>