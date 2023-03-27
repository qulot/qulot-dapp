<template>
  <div>
    <FormulateForm @submit="(data) => $emit('submit', data)" :form-errors="errors" class="mb-6 space-y-6">
      <FormulateInput
        type="text"
        name="otp"
        :placeholder="$t('auth.labels.placeholderOtp')"
        :label="$t('auth.labels.verifiedCode')"
        validation="required|number"
        :help="
          $t('auth.labels.notePhoneNumber', {
            phoneNumber: phoneNumber,
          })
        "
        :element-class="(context, classes) => ['relative'].concat(classes)"
      >
        <template #suffix>
          <span class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-sm text-main">{{
            $t('user.labels.getCode')
          }}</span>
        </template>
        <template #errors="{ visibleValidationErrors }">
          <div
            v-if="visibleValidationErrors && visibleValidationErrors.length > 0"
            class="flex items-center space-x-2 text-error text-xs mt-2"
          >
            <svg-icon name="warnning" class="h-3 w-3" />
            <span>{{ visibleValidationErrors[0] }}</span>
          </div>
        </template>
      </FormulateInput>
      <BButton :isLoading="loading" variant="primary" type="submit" class="w-full rounded-lg">
        {{ $t('auth.labels.send') }}
      </BButton>
    </FormulateForm>
    <div class="text-title text-center text-[17px] leading-tight">
      <p class="mb-6">
        <a href="javascript();" class="cursor-pointer hover:underline hover:text-main">
          {{ $t('auth.labels.changeAuthentication') }}
        </a>
      </p>
      <p>
        <a href="javascript();" class="cursor-pointer hover:underline hover:text-main">
          {{ $t('auth.labels.unavailableSecurity') }}
        </a>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CheckOtp',
  components: { BButton: () => import('@/components/button/BButton.vue') },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Array,
      default: () => [],
    },
    phoneNumber: {
      type: String,
      default: '',
    },
  },
  event: ['submit'],
}
</script>
