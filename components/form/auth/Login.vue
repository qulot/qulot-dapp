<template>
  <FormulateForm @submit="(data) => $emit('submit', data)" :form-errors="errors" class="space-y-6">
    <FormulateInput
      type="text"
      name="email"
      :placeholder="$t('auth.placeholder.email')"
      :label="$t('user.labels.email')"
      :disabled="loading"
      validation="required|email"
    >
      <template #label="{ label }">
        <div class="font-bold text-[17px] text-title mb-2">{{ label }}</div>
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

    <FormulateInput
      :placeholder="$t('auth.placeholder.password')"
      :label="$t('user.labels.password')"
      :type="showPassword ? 'text' : 'password'"
      name="password"
      :disabled="loading"
      validation="required"
      :element-class="(context, classes) => ['relative'].concat(classes)"
      :input-class="(context, classes) => ['placeholder:text-disable'].concat(classes)"
    >
      <template #label="{ label }">
        <div class="flex items-center justify-between mb-2">
          <span class="font-bold text-[17px] text-label">{{ label }}</span>
          <nuxt-link
            to="/auth/reset-password"
            class="font-normal text-sm leading-tight underline text-label hover:text-main"
          >
            {{ $t('auth.labels.forgotYourPassword') }}
          </nuxt-link>
        </div>
      </template>
      <template #suffix>
        <span class="absolute right-3 top-1/2 -mt-2.5 cursor-pointer" @click="showPassword = !showPassword"
          ><svg-icon :name="showPassword ? 'eye' : 'eye-off'" class="h-5 w-5 text-title"
        /></span>
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

    <div class="flex justify-between items-center mb-6">
      <FormulateInput
        type="checkbox"
        name="rememberme"
        :label="$t('auth.labels.rememberMe')"
        :label-class="'ml-2 text-label'"
        outer-class="mb-0"
      />
    </div>
    <BButton :isLoading="loading" variant="primary" type="submit" class="w-full rounded-lg">
      {{ $t('auth.labels.login') }}
    </BButton>
  </FormulateForm>
</template>
<script>
export default {
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
  },
  events: ['submit'],
  data() {
    return {
      showPassword: false,
    }
  },
}
</script>
