<template>
  <div
    :class="[
      'relative',
      'inline-flex',
      {
        placeholder: hasText,
      },
    ]"
  >
    <div
      class="aspect-square overflow-hidden"
      :class="[
        type,
        innerClass,
        {
          ['ring ring-offset-1 ring-offset-base-100 ring-' + border]: hasBorder,
          [sizeClass]: hasSizeClass,
          'text-center align-middle bg-neutral-focus text-neutral-content':
            hasText,
          block: hasImage,
          'flex items-center justify-center':
            !hasImage || !hasText || (hasImage && !isLoaded),
        },
      ]"
      :style="{ width: size }"
    >
      <img
        v-if="hasImage"
        v-show="isLoaded"
        ref="img"
        :src="imageSrc"
        alt="avatar"
        class="w-full h-full object-fill"
        @load="onImgLoad"
      />
      <span v-if="hasText">{{ text }}</span>
      <slot v-if="!isLoaded" name="default" />
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    required: false,
    default: 'rounded-full',
  },
  src: {
    type: String,
    required: false,
    default: null,
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
  innerClass: {
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
})

const isLoaded = ref(false)
const hasText = computed(() => !isEmpty(props.text))
const hasImage = computed(() => !isEmpty(props.src))
const hasBorder = computed(() => !isEmpty(props.border))
const hasSizeClass = computed(() => !isEmpty(props.sizeClass))
const onImgLoad = () => {
  isLoaded.value = true
}
onMounted(() => {
  if (hasText.value) {
    isLoaded.value = true
  }
})
</script>
