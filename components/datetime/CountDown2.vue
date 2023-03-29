<template>
  <div class="grid grid-flow-col gap-2 text-center auto-cols-max">
    <div class="flex flex-col space-y-1">
      <span
        class="countdown h-8 w-8 flex items-center justify-center text-sm font-bold text-title-nodark bg-white rounded-lg"
      >
        <span>{{ days }}</span>
      </span>
      <p class="text-[#5A5A5A] text-xs">
        {{ $t('datetime.labels.day') }}
      </p>
    </div>
    <span class="mt-1 font-bold text-title-nodark">:</span>
    <div class="flex flex-col space-y-1">
      <span
        class="countdown h-8 w-8 flex items-center justify-center text-sm font-bold text-title-nodark bg-white rounded-lg"
      >
        <span>{{ hours }}</span>
      </span>
      <p class="text-[#5A5A5A] text-xs">
        {{ $t('datetime.labels.hour') }}
      </p>
    </div>
    <span class="mt-1 font-bold text-title-nodark">:</span>
    <div class="flex flex-col space-y-1">
      <span
        class="countdown h-8 w-8 flex items-center justify-center text-sm font-bold text-title-nodark bg-white rounded-lg"
      >
        <span>{{ minutes }}</span>
      </span>
      <p class="text-[#5A5A5A] text-xs">
        {{ $t('datetime.labels.minute') }}
      </p>
    </div>
    <span class="mt-1 font-bold text-title-nodark">:</span>
    <div class="flex flex-col space-y-1">
      <span
        class="countdown h-8 w-8 flex items-center justify-center text-sm font-bold text-title-nodark bg-white rounded-lg"
      >
        <span>{{ seconds }}</span>
      </span>
      <p class="text-[#5A5A5A] text-xs">
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
const timer = ref<number>()
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
  return days < 0 ? `00` : days
})

/**
 * Remaining hours.
 * @returns {number} The computed value.
 */
const hours = computed(() => {
  const hours = Math.floor((totalMilliseconds.value % ONE_DAY) / ONE_HOUR)
  return hours < 0 ? `00` : hours
})

/**
 * Remaining minutes.
 * @returns {number} The computed value.
 */
const minutes = computed(() => {
  const minutes = Math.floor((totalMilliseconds.value % ONE_HOUR) / ONE_MINUTE)
  return minutes < 0 ? `00` : minutes
})

/**
 * Remaining seconds.
 * @returns {number} The computed value.
 */
const seconds = computed(() => {
  const seconds = Math.floor(
    (totalMilliseconds.value % ONE_MINUTE) / ONE_SECOND
  )
  return seconds < 0 ? `00` : seconds
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

onUnmounted(() => {
  clear()
})

onBeforeUnmount(() => {
  clear()

  timer.value = setInterval(() => {
    // force update total milliseconds
    update()

    if (isEqual) {
      clear()
    }
  }, ONE_SECOND)
})
</script>
