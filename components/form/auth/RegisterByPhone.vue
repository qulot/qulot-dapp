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

    <div class="flex justify-between gap-1">
      <FormulateInput
        type="text"
        name="firstName"
        :placeholder="$t('auth.placeholder.firstName')"
        :label="$t('user.labels.firstName')"
        :disabled="loading"
        validation="required"
      >
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
        type="text"
        name="lastName"
        :placeholder="$t('auth.placeholder.lastName')"
        :label="$t('user.labels.lastName')"
        :disabled="loading"
      >
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
    </div>

    <FormulateInput
      :type="showPassword ? 'text' : 'password'"
      name="password"
      :placeholder="$t('auth.placeholder.password')"
      :label="$t('auth.labels.password')"
      :disabled="loading"
      validation="required"
      :element-class="(context, classes) => ['relative'].concat(classes)"
      :input-class="(context, classes) => ['placeholder:text-disable'].concat(classes)"
    >
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
    <div class="flex justify-between items-center">
      <FormulateInput
        v-model="isAccept"
        type="checkbox"
        outer-class="mb-0"
        :element-class="(context, classes) => ['self-start'].concat(classes)"
      >
        <template #label>
          <i18n path="auth.labels.acceptPolicy" tag="div" class="text-sm text-subtitle ml-2 self-start">
            <template #terms>
              <nuxt-link to="/terms-of-service#account" class="underline text-title hover:text-main">
                {{ $t('auth.labels.terms') }}
              </nuxt-link>
            </template>
            <template #policy>
              <nuxt-link to="/" class="underline text-title hover:text-main">
                {{ $t('auth.labels.policy') }}
              </nuxt-link>
            </template>
          </i18n>
        </template>
      </FormulateInput>
    </div>
    <BButton :isLoading="loading" variant="primary" type="submit" class="w-full rounded-lg" :disabled="!isAccept">
      {{ $t('auth.labels.signupNow') }}
    </BButton>
  </FormulateForm>
</template>
<script>
export default {
  components: { BButton: () => import('@/components/button/BButton.vue') },
  emits: ['submit'],
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
      isAccept: false,
      showPassword: false,
    }
  },
  methods: {
    handleSubmit(data) {
      const valuePhone = {
        ...data,
        phone: data.phone.split(' ').join(''),
        password: data.password,
      }
      this.$emit('submit', valuePhone)
    },
  },
}
</script>
