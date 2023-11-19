<template>
  <div>
    <FormKit
      :errors="errors"
      type="form"
      :actions="false"
      @submit="(data: any) => $emit('submit', data)"
    >
      <div class="space-y-4">
        <FormKit
          type="text"
          name="email"
          :placeholder="$t('auth.placeholderEmail')"
          :label="$t('user.email')"
          :disabled="loading"
          validation="required|email"
        />
        <Button
          :is-loading="loading"
          variant="primary"
          type="submit"
          class="w-full rounded-lg"
        >
          {{ $t('auth.resetPassword') }}
        </Button>
      </div>
    </FormKit>
  </div>
</template>
<script setup lang="ts">
defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  errors: {
    type: Array<string>,
    default: () => [],
  },
})

defineEmits(['submit'])
</script>
