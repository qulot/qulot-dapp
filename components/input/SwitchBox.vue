<template>
  <div
    class="switchbox"
    :class="modelValue ? 'checked bg-main' : 'bg-disable'"
    @click="toggleSwitch"
  >
    <div class="switchbox__handle"></div>
    <div class="switchbox__inner flex items-center justify-center">
      <slot v-if="modelValue" name="checked"> </slot>
      <slot v-else name="closed"> </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const toggleSwitch = () => {
  emit('update:modelValue', !props.modelValue)
}
</script>

<style lang="css" scoped>
.switchbox {
  position: relative;
  border-radius: 14px;
  height: 28px;
  width: 48px;
  cursor: pointer;
}

.switchbox.checked .switchbox__handle {
  left: 23px;
}

.switchbox.checked .switchbox__inner {
  right: 23px;
}

.switchbox__handle {
  position: absolute;
  top: 50%;
  margin-top: -10px;
  left: 5px;
  height: 20px;
  width: 20px;
  background: #ffffff;
  border-radius: 100%;
  box-shadow: -1px 2px 3px rgba(0, 0, 0, 0.2);
  transition: all 0.35s ease;
  z-index: 2;
}

.switchbox__inner {
  position: absolute;
  top: 50%;
  margin-top: -10px;
  right: 5px;
  height: 20px;
  width: 20px;
  transition: all 0.35s ease;
  z-index: 1;
}
</style>
