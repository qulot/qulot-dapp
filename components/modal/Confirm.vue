<template>
  <Modal
    v-model="showValue"
    :title="title"
    header-class="px-6 py-4 border-b border-[#D8D8D8]"
    body-class="px-6 py-4 border-b border-[#D8D8D8]"
    footer-class="flex justify-between px-6 py-4"
  >
    <template #body>
      <p class="text-dark">{{ content }}</p>
    </template>
    <template #footer>
      <Button
        v-if="btnCancel.active"
        :variant="btnCancel.variant"
        :class="btnCancel.class"
        rounded
        @click="cancel"
      >
        {{ btnCancel.text || $t('labels.cancel') }}
      </Button>
      <Button
        v-if="btnConfirm.active"
        :variant="btnConfirm.variant"
        :class="btnConfirm.class"
        rounded
        @click="confirm"
      >
        {{ btnConfirm.text || $t('labels.confirm') }}
      </Button>
    </template>
  </Modal>
</template>
<script setup lang="ts">
import { PropType } from 'vue'

export interface ButtonProps {
  text?: string
  class?: String | Array<String> | Object
  active?: boolean
  variant?: string
}

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  show: {
    type: Boolean,
    default: false,
  },
  btnConfirm: {
    type: Object as PropType<ButtonProps>,
    default: () => ({
      active: true,
      variant: 'primary',
    }),
  },
  btnCancel: {
    type: Object as PropType<ButtonProps>,
    default: () => ({
      active: true,
      variant: 'secondary',
    }),
  },
})

const emit = defineEmits(['update:show', 'confirm', 'cancel'])

const showValue = computed({
  get() {
    return props.show
  },
  set(value) {
    emit('update:show', value)
  },
})

const confirm = () => {
  showValue.value = false
  emit('confirm')
}

const cancel = () => {
  showValue.value = false
  emit('cancel')
}
</script>
