<template>
  <div :class="avatarClasses">
    <div class="text-center align-middle" :class="childClasses" :style="{ width: sizeWidth }">
      <img v-if="hasImage" v-show="isLoaded" ref="img" :src="imageSrc" @load="onImgLoad" alt="avatar" />
      <span v-if="hasText">{{ text }}</span>
      <slot v-if="!isLoaded" name="default" />
    </div>
  </div>
</template>
<script>
import isEmpty from 'lodash.isempty'
export default {
  props: {
    type: {
      type: String,
      require: false,
      default: 'rounded-full',
    },
    src: {
      type: String,
      require: true,
    },
    size: {
      type: String,
      require: false,
      default: null,
    },
    sizeClass: {
      type: String,
      require: false,
      default: null,
    },
    border: {
      type: String,
      require: false,
      default: null,
    },
    text: {
      type: String,
      require: false,
      default: null,
    },
  },
  computed: {
    ringBorder() {
      if (isEmpty(this.border)) {
        return ''
      }
      return 'ring ring-offset-1 ring-offset-base-100 ring-' + this.border
    },
    sizeWidth() {
      return this.size
    },
    imageSrc() {
      return this.src
    },
    hasText() {
      return !isEmpty(this.text)
    },
    hasImage() {
      return !isEmpty(this.src)
    },
    childClasses() {
      var classes = [this.ringBorder]

      classes.push(this.type)

      if (!isEmpty(this.sizeClass)) {
        classes.push(this.sizeClass)
      }

      if (this.hasText) {
        classes.push('bg-neutral-focus text-neutral-content')
      }

      return classes
    },
    avatarClasses() {
      var classes = ['avatar']
      if (this.hasText) {
        classes.push('placeholder')
      }

      return classes
    },
  },
  data() {
    return {
      isLoaded: false,
    }
  },
  methods: {
    onImgLoad() {
      this.isLoaded = true
    },
  },
  created() {
    if (this.hasText) {
      this.isLoaded = true
    }
  },
}
</script>
