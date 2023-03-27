<template>
  <FormulateForm @submit="handleSubmit" :form-errors="errors" class="space-y-6">
    <FormulateInput
      type="phonenumber"
      name="phone"
      :label="$t('auth.labels.labelPhoneNumber')"
      :label-class="'font-bold text-[17px] text-title mb-2'"
      class="mb-1"
      validation="required|phonenumber"
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
      :type="showPassword ? 'text' : 'password'"
      name="password"
      :placeholder="$t('auth.placeholder.password')"
      :label="$t('user.labels.password')"
      :disabled="loading"
      validation="required"
      v-model="password"
      :element-class="(context, classes) => ['relative'].concat(classes)"
      :input-class="(context, classes) => ['placeholder:text-disable'].concat(classes)"
    >
      <template #label="{ label }">
        <div class="flex items-center justify-between">
          <span class="font-bold text-[17px] text-title mb-2">{{ label }}</span>
          <nuxt-link
            to="/auth/reset-password"
            class="font-normal text-sm leading-tight underline text-title hover:text-main"
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

    <FormulateInput
      type="checkbox"
      name="rememberme"
      :label="$t('auth.labels.rememberMe')"
      :label-class="'ml-2 text-label'"
      outer-class="mb-0"
    />
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
  data() {
    return {
      showPassword: false,
      phone: '',
      password: '',
    }
  },
  events: ['submit'],
  methods: {
    handleSubmit(data) {
      const valuePhone = {
        phone: data.phone.split(' ').join(''),
        password: data.password,
      }
      this.$emit('submit', valuePhone)
    },
    log(message) {
      console.log('message', message)
    },
  },
}
</script>
