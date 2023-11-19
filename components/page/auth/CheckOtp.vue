<template>
  <div>
    <FormKit
      type="form"
      :actions="false"
      :errors="errors"
      @submit="(data: any) => $emit('submit', data)"
    >
      <div class="space-y-4">
        <FormKit
          type="text"
          name="otp"
          :placeholder="$t('auth.placeholderOtp')"
          :label="$t('auth.confirmOtp')"
          validation="required|number"
          :help="
            $t('auth.helpOptInput', {
              otpLength,
              email,
            })
          "
        />

        <Button
          :is-loading="loading"
          variant="primary"
          type="submit"
          class="w-full rounded-lg"
        >
          {{ $t('auth.send') }}
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
    type: Array,
    default: () => [],
  },
  email: {
    type: String,
    default: '',
  },
  otpLength: {
    type: Number,
    default: 6,
  },
})

defineEmits(['submit'])
</script>
