<template>
  <div
    class="grid grid-flow-col gap-1 xl:gap-2 text-center auto-cols-max text-[#5A5A5A]"
  >
    <div class="flex flex-col space-y-1">
      <span
        class="countdown h-9 w-9 xl:h-12 xl:w-12 flex items-center justify-center text-lg xl:text-xl font-bold text-white bg-title-nodark rounded-lg"
      >
        <span>{{ days }}</span>
      </span>
      <p class="text-xs">
        {{ $t('datetime.labels.day') }}
      </p>
    </div>

    <div class="flex flex-col space-y-1">
      <span
        class="countdown h-9 w-9 xl:h-12 xl:w-12 flex items-center justify-center text-lg xl:text-xl font-bold text-white bg-title-nodark rounded-lg"
      >
        <span>{{ hours }}</span>
      </span>
      <p class="text-xs">
        {{ $t('datetime.labels.hour') }}
      </p>
    </div>

    <div class="flex flex-col space-y-1">
      <span
        class="countdown h-9 w-9 xl:h-12 xl:w-12 flex items-center justify-center text-lg xl:text-xl font-bold text-white bg-title-nodark rounded-lg"
      >
        <span>{{ minutes }}</span>
      </span>
      <p class="text-xs">
        {{ $t('datetime.labels.minute') }}
      </p>
    </div>

    <div class="flex flex-col space-y-1">
      <span
        class="countdown h-9 w-9 xl:h-12 xl:w-12 flex items-center justify-center text-lg xl:text-xl font-bold text-white bg-title-nodark rounded-lg"
      >
        <span>{{ seconds }}</span>
      </span>
      <p class="text-xs">
        {{ $t('datetime.labels.second') }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const ONE_SECOND = 1000
const ONE_MINUTE = 60 * ONE_SECOND
const ONE_HOUR = 60 * ONE_MINUTE
const ONE_DAY = 24 * ONE_HOUR

const current = ref<Date>()
const timer = ref<NodeJS.Timer>()
const totalMilliseconds = ref(0)

const props = defineProps({
  target: {
    type: Date,
    required: false,
    default: () => new Date(),
  },
})

/**
 * check is end timer
 */
const isEqual = computed(() => {
  return totalMilliseconds.value === 0
})

/**
 * Remaining days.
 * @returns {number} The computed value.
 */
const days = computed(() => {
  const days = Math.floor(totalMilliseconds.value / ONE_DAY)
  return formatIntDigits(days < 0 ? 0 : days, 2)
})

/**
 * Remaining hours.
 * @returns {number} The computed value.
 */
const hours = computed(() => {
  const hours = Math.floor((totalMilliseconds.value % ONE_DAY) / ONE_HOUR)
  return formatIntDigits(hours < 0 ? 0 : hours, 2)
})

/**
 * Remaining minutes.
 * @returns {number} The computed value.
 */
const minutes = computed(() => {
  const minutes = Math.floor((totalMilliseconds.value % ONE_HOUR) / ONE_MINUTE)
  return formatIntDigits(minutes < 0 ? 0 : minutes, 2)
})

/**
 * Remaining seconds.
 * @returns {number} The computed value.
 */
const seconds = computed(() => {
  const seconds = Math.floor(
    (totalMilliseconds.value % ONE_MINUTE) / ONE_SECOND
  )
  return formatIntDigits(seconds < 0 ? 0 : seconds, 2)
})

/**
 * Clear timer
 */
const clear = () => {
  if (timer.value) {
    clearInterval(timer.value)
  }
}

/**
 * Force update total milliseconds
 */
const update = () => {
  current.value = new Date()
  totalMilliseconds.value = props.target.getTime() - current.value.getTime()
}

timer.value = setInterval(() => {
  // force update total milliseconds
  update()

  if (isEqual.value) {
    clear()
  }
}, ONE_SECOND)

onBeforeUnmount(() => {
  clear()
})
</script>
