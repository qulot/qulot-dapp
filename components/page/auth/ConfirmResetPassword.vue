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

        <FormKit
          :placeholder="$t('auth.placeholderPassword')"
          :label="$t('user.newPassword')"
          :type="showPassword ? 'text' : 'password'"
          name="password"
          :disabled="loading"
          validation="required"
          suffix-icon="eyeClosed"
          @suffix-icon-click="handleIconClick"
        />

        <Button
          :is-loading="loading"
          variant="primary"
          type="submit"
          class="w-full rounded-lg"
        >
          {{ $t('auth.confirmResetPassword') }}
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

const showPassword = ref(false)

const handleIconClick = (node: any, e: any) => {
  node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
  node.props.type = node.props.type === 'password' ? 'text' : 'password'
}
</script>
