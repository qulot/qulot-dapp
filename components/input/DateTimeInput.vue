<template>
  <div ref="datetimeInput">
    <date-picker
      v-model="context.model"
      placeholder="Chọn ngày"
      format="DD/MM/YYYY"
      value-type="YYYY-MM-DD"
      :append-to-body="false"
      :input-class="context.classes.input"
      class="!w-auto"
    >
      <template #icon-calendar>
        <svg-icon name="calendar" class="w-4 h-4" />
      </template>
    </date-picker>
  </div>
</template>

<script>
export default {
  name: 'DateTimeInput',
  props: {
    context: {
      type: Object,
      required: true,
    },
  },
}
</script>
