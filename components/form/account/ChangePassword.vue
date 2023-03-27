<template>
  <div>
    <BAlert
      v-show="isSuccess"
      variant="success"
      :text="$t('message.success', { msg: $t('user.labels.changePassword') })"
    />
    <FormulateForm @submit="(data) => $emit('submit', data)" :form-errors="errors">
      <FormulateInput type="password" name="oldPassword" :label="$t('user.labels.oldPassword')" :disabled="isLoading" />

      <FormulateInput
        type="password"
        name="newPassword"
        :label="$t('user.labels.newPassword')"
        :disabled="isLoading"
        validation="required"
        :validation-name="$t('user.labels.newPassword')"
      />

      <BButton :isLoading="isLoading" class="w-full rounded-lg" type="submit" variant="primary">
        {{ $t('user.labels.changePassword') }}
      </BButton>
    </FormulateForm>
  </div>
</template>
<script>
import BButton from '@/components/button/BButton.vue'
import BAlert from '@/components/alert/BAlert.vue'

export default {
  components: { BButton, BAlert },
  emits: ['submit'],
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    isSuccess: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
