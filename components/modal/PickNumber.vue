<template>
  <Modal
    v-model="showValue"
    :title="$t('ticket.pickTicketNumbers')"
    header-class="px-6 py-4 border-b border-[#D8D8D8]"
    body-class="flex justify-center flex-col px-6 py-4 border-b border-[#D8D8D8]"
    footer-class="flex justify-center space-x-2 px-6 py-4"
  >
    <template #body>
      <div class="flex flex-wrap items-center gap-2">
        <BallItem
          v-for="(num, i) in maxValuePerItem"
          :key="i"
          :number="num"
          :disable="ticket.length > 0 ? ticket.indexOf(num) === -1 : true"
          class="w-10 h-10 cursor-pointer"
          @click="pickNumber(num)"
        />
      </div>
    </template>
    <template #footer>
      <Button
        variant="secondary"
        rounded
        class="dark:text-white"
        @click="generateRandom"
      >
        {{ $t('ticket.random') }}
      </Button>
      <Button variant="primary" rounded @click="confirm">
        {{ $t('labels.confirm') }}
      </Button>
    </template>
  </Modal>
</template>
<script setup lang="ts">
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  numberOfItems: {
    type: Number,
    default: 0,
  },
  minValuePerItem: {
    type: Number,
    default: 0,
  },
  maxValuePerItem: {
    type: Number,
    default: 0,
  },
})

const ticket = ref<number[]>([])

const emit = defineEmits<{
  (e: 'update:show', show: boolean): void
  (e: 'confirm', show: number[]): void
}>()

const showValue = computed({
  get() {
    return props.show
  },
  set(value) {
    emit('update:show', value)
  },
})

const pickNumber = (num: number) => {
  const index = ticket.value.length > 0 ? ticket.value.indexOf(num) : -1
  if (index > -1) {
    ticket.value.splice(index, 1)
  } else if (ticket.value.length < props.numberOfItems) {
    ticket.value.push(num)
  }
}

const generateRandom = () => {
  ticket.value = bulkRandomRange(
    props.numberOfItems,
    props.minValuePerItem,
    props.maxValuePerItem
  )
}

const confirm = () => {
  showValue.value = false
  emit('confirm', ticket.value)
}
</script>
