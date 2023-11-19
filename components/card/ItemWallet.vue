<template>
  <div class="item-wallet p-4 pr-2 relative">
    <div>
      <p class="text-white mb-2 text-xs lg:text-sm font-normal">{{ title }}</p>
      <div class="font-bold text-2xl flex items-center justify-between">
        <div
          v-show="isLoading"
          class="h-[32px] w-[100px] animate-pulse bg-slate-200 rounded"
        ></div>
        <span v-show="!isLoading" class="text-main"> {{ valueWallet }} </span>
      </div>
    </div>
    <!-- Circle -->
    <span
      class="w-3 h-3 rounded-full bg-[#7230C0] absolute -top-1.5 -left-1.5"
    ></span>
    <span
      class="w-3 h-3 rounded-full bg-[#7230C0] absolute -top-1.5 -right-1.5"
    ></span>
    <span
      class="w-3 h-3 rounded-full bg-[#7230C0] absolute -bottom-1.5 -left-1.5"
    ></span>
    <span
      class="w-3 h-3 rounded-full bg-[#7230C0] absolute -bottom-1.5 -right-1.5"
    ></span>
    <!-- End Circle -->
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: '',
  },
  valueWallet: {
    type: [String, Number],
    default: '',
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped>
.item-wallet {
  background: linear-gradient(90deg, #8041e5 0%, #8a30e5 49.29%);
  box-shadow: 1px 4px 10px rgba(75, 33, 142, 0.4);
}

.item-wallet::before,
.item-wallet::after {
  content: '';
  position: absolute;
  z-index: 1;
  width: calc(100% - 12px);
  height: 1px;
  left: 6px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    #ffffff 56%,
    rgba(255, 255, 255, 0) 100%
  );
}

.item-wallet::before {
  top: 0;
}

.item-wallet::after {
  bottom: 0;
}
</style>
