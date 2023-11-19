<template>
  <label class="flex items-center text-xs text-content">
    <div
      class="border w-4 h-4 rounded-full flex flex-shrink-0 justify-center items-center cursor-pointer focus-within:border-main"
      :class="shouldBeChecked ? 'border-main' : 'border-default'"
    >
      <span
        class="w-1.5 h-1.5 rounded-full"
        :class="shouldBeChecked ? 'bg-main' : ''"
      ></span>
    </div>
    <span v-if="label" class="leading-relaxed cursor-pointer ml-3">{{
      label
    }}</span>
    <slot></slot>
    <input
      :checked="shouldBeChecked"
      :value="value"
      type="radio"
      class="opacity-0 absolute h-4 w-4 cursor-pointer"
      :disabled="disabled"
      @change="$emit('change', value)"
    />
  </label>
</template>
<script setup lang="ts">
const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    required: false,
    default: undefined,
  },
})

defineEmits(['change'])

const shouldBeChecked = computed(() => props.modelValue === props.value)
</script>
