<template>
  <VueFinalModal
    v-model="value"
    class="flex items-center justify-center"
    :content-class="[
      'flex flex-col rounded-lg mx-3 overflow-hidden',
      {
        'max-w-xs': size === 'xs',
        'max-w-screen-sm': size === 'sm',
        'max-w-screen-md': size === 'md',
        'max-w-screen-lg': size === 'lg',
        'max-w-screen-xl': size === 'xl',
      },
    ]"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
    :z-index-fn="zIndexFn"
  >
    <div
      v-if="header"
      class="min-h-12 w-100 flex items-center bg-white dark:bg-slate-900"
      :class="headerClass"
    >
      <slot name="header">
        <slot name="title">
          <h5
            v-if="title"
            class="text-title-nodark dark:text-white font-bold"
            :class="titleClass"
          >
            {{ title }}
          </h5>
        </slot>
        <slot name="close">
          <svg-icon
            v-if="closeButton"
            name="close-circle"
            class="w-5 h-5 cursor-pointer ml-auto dark:text-white"
            :class="closeButtonClass"
            @click="value = false"
          />
        </slot>
      </slot>
    </div>
    <div
      v-if="body"
      class="flex-1 w-100 bg-white dark:bg-slate-800"
      :class="bodyClass"
    >
      <slot name="body"> </slot>
    </div>
    <div
      v-if="footer"
      class="min-h-12 w-100 bg-white dark:bg-slate-900"
      :class="footerClass"
    >
      <slot name="footer"> </slot>
    </div>
  </VueFinalModal>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { VueFinalModal } from 'vue-final-modal'

export type IModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const props = defineProps({
  header: {
    type: Boolean,
    default: true,
  },
  headerClass: {
    type: [String, Array, Object],
    default: () => [],
  },
  body: {
    type: Boolean,
    default: true,
  },
  bodyClass: {
    type: [String, Array, Object],
    default: () => [],
  },
  footer: {
    type: Boolean,
    default: true,
  },
  footerClass: {
    type: [String, Array, Object],
    default: () => [],
  },
  title: {
    type: String,
    default: null,
  },
  titleClass: {
    type: [String, Array, Object],
    default: () => [],
  },
  closeButton: {
    type: Boolean,
    default: true,
  },
  closeButtonClass: {
    type: [String, Array, Object],
    default: () => [],
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<IModalSize>,
    default: 'sm',
  },
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const zIndexFn = ({ index }: { index: number }) => 900 + 2 * index
</script>
