<template>
  <div class="grid grid-flow-col gap-2 text-center auto-cols-max">
    <div class="flex flex-col space-y-1">
      <span
        class="
          countdown
          h-8
          w-8
          flex
          items-center
          justify-center
          text-sm
          font-bold
          text-title-nodark
          bg-white
          rounded-lg
        "
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
        class="
          countdown
          h-8
          w-8
          flex
          items-center
          justify-center
          text-sm
          font-bold
          text-title-nodark
          bg-white
          rounded-lg
        "
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
        class="
          countdown
          h-8
          w-8
          flex
          items-center
          justify-center
          text-sm
          font-bold
          text-title-nodark
          bg-white
          rounded-lg
        "
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
        class="
          countdown
          h-8
          w-8
          flex
          items-center
          justify-center
          text-sm
          font-bold
          text-title-nodark
          bg-white
          rounded-lg
        "
      >
        <span>{{ seconds }}</span>
      </span>
      <p class="text-[#5A5A5A] text-xs">
        {{ $t('datetime.labels.second') }}
      </p>
    </div>
  </div>
</template>
<script>
const ONE_SECOND = 1000
const ONE_MINUTE = 60 * ONE_SECOND
const ONE_HOUR = 60 * ONE_MINUTE
const ONE_DAY = 24 * ONE_HOUR
export default {
  name: 'CountDown2',
  props: {
    target: {
      require: true,
      default: new Date(),
    },
  },
  data() {
    return {
      current: null,
      timer: null,
      totalMilliseconds: 0,
    }
  },

  created() {
    this.clear()

    this.timer = setInterval(() => {
      // force update total milliseconds
      this.update()

      this.$forceUpdate()

      if (this.isEqual) {
        this.clear()
      }
    }, ONE_SECOND)
  },
  computed: {
    /**
     * check is end timer
     */
    isEqual() {
      return this.totalMilliseconds === 0
    },
    /**
     * Remaining days.
     * @returns {number} The computed value.
     */
    days() {
      const days = Math.floor(this.totalMilliseconds / ONE_DAY)
      return days < 0 ? `00` : days
    },

    /**
     * Remaining hours.
     * @returns {number} The computed value.
     */
    hours() {
      const hours = Math.floor((this.totalMilliseconds % ONE_DAY) / ONE_HOUR)
      return hours < 0 ? `00` : hours
    },

    /**
     * Remaining minutes.
     * @returns {number} The computed value.
     */
    minutes() {
      const minutes = Math.floor((this.totalMilliseconds % ONE_HOUR) / ONE_MINUTE)
      return minutes < 0 ? `00` : minutes
    },

    /**
     * Remaining seconds.
     * @returns {number} The computed value.
     */
    seconds() {
      const seconds = Math.floor((this.totalMilliseconds % ONE_MINUTE) / ONE_SECOND)
      return seconds < 0 ? `00` : seconds
    },
  },
  methods: {
    /**
     * force update total milliseconds
     */
    update() {
      this.current = new Date()

      this.totalMilliseconds = this.target.getTime() - this.current.getTime()
    },
    /**
     * clear timer
     */
    clear() {
      if (this.timer) {
        clearInterval(this.timer)
      }
    },
  },
  beforeDestroy() {
    this.clear()
  },
}
</script>
