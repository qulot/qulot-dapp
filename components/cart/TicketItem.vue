<template>
  <div
    class="relative text-sm text-title-nodark"
    :class="{ 'opacity-50': disabled }"
  >
    <div
      class="overflow-hidden box-border relative before:content-[''] before:absolute before:h-3 before:w-3 before:rounded-full before:bg-white dark:before:bg-block before:left-0 before:top-1/2 before:-mt-1.5 before:-ml-1.5 before:border before:border-solid after:content-[''] after:absolute after:h-3 after:w-3 after:rounded-full after:bg-white dark:after:bg-block after:right-0 after:top-1/2 after:-mr-1.5 after:-mt-1.5 after:border after:border-solid"
      :class="'before:border-white after:border-white'"
    >
      <div
        class="bg-[#F3EFFF] rounded lg:rounded-lg p-3 xl:p-4 border border-solid min-h-[100px] lg:flex items-center space-y-3 lg:space-y-0 lg:space-x-4 xl:space-x-8"
        :class="'border-[#F3EFFF]'"
      >
        <!-- 1 -->
        <div class="flex items-center lg:w-3/5">
          <div
            class="w-[70px] h-[70px] rounded overflow-hidden mr-2 lg:mr-4 flex items-center"
          >
            <img
              v-if="lotteryPicture"
              class="inset-0"
              :src="lotteryPicture"
              alt="thumbnail"
            />
          </div>
          <div>
            <div
              class="text-[17px] font-bold text-title-nodark leading-tight mb-3"
            >
              {{ lotteryVerboseName }} ❘
              {{ $t('round.roundId', { round: roundId }) }}
            </div>
            <div class="flex items-center space-x-2">
              <div v-for="num in pickNumbers" :key="num">
                <BallItem :number="num" />
              </div>
            </div>
          </div>
        </div>
        <div class="w-px h-10 bg-[#D8D8D8] hidden lg:block"></div>
        <!-- 2 -->
        <div class="pl-[78px] lg:pl-0 flex items-center flex-1 justify-between">
          <div class="space-x-1 leading-tight">
            <span class="text-[17px] font-bold text-title-nodark">
              {{ pricePerTicket }}
              <span class="text-xs">{{ currency }}</span>
            </span>
          </div>
          <div
            class="absolute lg:relative top-4 right-3 lg:top-auto lg:right-auto flex items-center space-x-5 lg:space-x-7"
          >
            <div
              class="cursor-pointer hover:text-error"
              @click="$emit('delete')"
            >
              {{ $t('cart.deleteTicket') }}
            </div>
            <div
              class="cursor-pointer"
              @click="() => !disabled && $emit('select')"
            >
              <span v-show="selected">
                <svg-icon name="checkbox" class="w-4 h-4" />
              </span>
              <span v-show="!selected">
                <svg-icon name="uncheck" class="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  roundId: {
    type: String,
    required: true,
    default: null,
  },
  lotteryPicture: {
    type: String,
    required: false,
    default: null,
  },
  lotteryVerboseName: {
    type: String,
    required: false,
    default: null,
  },
  pickNumbers: {
    type: Array as PropType<number[]>,
    default: () => [],
  },
  pricePerTicket: {
    type: String,
    required: false,
    default: null,
  },
  currency: {
    type: String,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['delete', 'select'])
</script>
