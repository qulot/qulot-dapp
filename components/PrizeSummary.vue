<template>
  <div
    class="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 space-x-0 lg:space-x-4 bg-[#F3EFFF] dark:bg-block rounded-lg p-3 lg:p-3 xl:p-6 text-sm"
  >
    <div class="flex items-center gap-x-2 xl:gap-x-6 lg:w-4/12">
      <div class="w-20 h-20 xl:w-32 xl:h-32 flex items-center">
        <img :src="product.picture" alt="" />
      </div>
      <div class="flex-grow space-y-1">
        <h2 class="text-[17px] font-bold text-black">{{ productName }}</h2>
        <p class="text-sm">{{ $t('product.labels.estimate') }}</p>
        <p class="text-[#6135E9] text-2xl font-bold md:text-3xl">
          {{ jackpotEstimatedValue }}
        </p>
      </div>
    </div>
    <div class="flex !mr-auto flex-col justify-center lg:w-3/12 xl:w-4/12">
      <p class="text-xs mb-2 md:mb-4 md:text-sm" v-html="resultLabel"></p>
      <div class="flex items-center gap-x-1">
        <div v-for="(num, i) in winningNumbers" :key="i" class="mr-2">
          <CircleItem :number="num" />
        </div>
      </div>
    </div>
    <div
      class="flex flex-col justify-center xl:items-center xl:flex-row xl:gap-x-6"
    >
      <div class="flex flex-col justify-center h-full flex-grow">
        <p>{{ $t('product.labels.nextDrawing') }}</p>
        <div>
          <DatetimeCountDown2
            v-if="nextDrawDatetime"
            class="w-full my-2"
            :target="nextDrawDatetime"
          />
        </div>
      </div>
    </div>
    <div>
      <Button
        type="text"
        :is-loading="loading"
        variant="primary"
        class="font-bold rounded !justify-between !text-white"
        @click="$router.push(`/product/${product.id}`)"
      >
        <span>{{ $t('product.labels.playNow') }}</span>
        <svg-icon name="arrow-right-circle" class="w-4 h-4" />
      </Button>
    </div>
  </div>
</template>
<script setup lang="ts">
const { t } = useLang()

const props = defineProps({
  product: {
    type: [Object],
    require: true,
    default: null,
  },
})

const loading = ref(false)

const resultLabel = computed(() => {
  return t('product.labels.result', {
    id: '#' + formatNumber(props.product.lastSessionId),
    date: formatDateTime(props.product.lastSessionDrawDatetime, 'ddmmyyyy'),
  })
})

const productName = computed(() => {
  const verboseName = props.product.verboseName
  const numberOfItems = props.product.numberOfItems || 0
  const maxValuePerItem = props.product.maxValuePerItem || 0
  return `${verboseName} Jackpot ${numberOfItems || 0}/${maxValuePerItem || 0}`
})

const jackpotEstimatedValue = computed(() => {
  const jackpot = props.product.nextSessionEstimatedJackpot || 0
  return formatUSD(jackpot)
})

const winningNumbers = computed(() => {
  const winningNumbers = props.product.lastSessionWinningNumbers || []
  return winningNumbers
})

const nextDrawDatetime = computed(() => {
  return toDateTime(props.product.nextSessionDrawDatetime)
})
</script>
