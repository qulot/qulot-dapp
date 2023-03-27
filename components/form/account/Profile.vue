<template>
  <div class="bg-white dark:bg-block shadow-default rounded-lg">
    <div class="banner-top">
      <img src="/bg/bg-top-userinfo.svg" alt="banner-top" class="w-full h-auto" />
    </div>
    <div class="px-4 pb-4">
      <div class="-mt-[70px] relative flex flex-col items-center justify-center mb-6">
        <div class="relative">
          <div
            class="
              w-[140px]
              h-[140px]
              border border-solid border-white
              rounded-full
              overflow-hidden
              flex
              items-center
              justify-center
              bg-gray
              mb-2
              relative
              avatar
            "
          >
            <img
              v-if="formValues.picture && !loadAvatarError"
              :src="formValues.picture"
              @error="loadAvatarError = true"
              alt="avatar"
            />
            <svg-icon v-else name="user" class="w-10 h-10" />
          </div>
          <span
            class="
              h-10
              w-10
              rounded-full
              bg-white
              text-title-nodark
              flex
              items-center
              justify-center
              absolute
              top-0
              right-0
              cursor-pointer
            "
            @click="changeAvatar"
          >
            <svg-icon name="camera" class="w-6 h-6" />
          </span>
        </div>
        <div
          class="text-title text-[24px] font-bold mb-1 text-ellipsis w-full overflow-hidden"
          :title="formValues.username"
        >
          {{ formValues.username }}
        </div>
        <div class="text-sm">ID: #{{ formValues.id }}</div>
      </div>
      <BAlert v-if="success && !hideNoti" variant="success" :text="$t('user.message.alreadySuccess')" class="mb-4" />
      <div class="information space-y-4">
        <FormulateForm
          @submit="(data) => $emit('submit', data)"
          :form-errors="errors"
          :values="formValues"
          class="space-y-6"
        >
          <FormulateInput
            type="text"
            name="username"
            :element-class="(context, classes) => ['relative'].concat(classes)"
            :label="$t('auth.labels.account')"
            :disabled="loading"
            validation="required"
          >
            <template #suffix>
              <span class="absolute right-3 top-1/2 -mt-2.5 cursor-pointer">
                <svg-icon name="edit" class="h-5 w-5 text-title" />
              </span>
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
            type="text"
            name="firstName"
            :label="$t('user.labels.firstName')"
            :disabled="loading"
            validation="required"
            :element-class="(context, classes) => ['relative'].concat(classes)"
          >
            <template #suffix>
              <span class="absolute right-3 top-1/2 -mt-2.5 cursor-pointer">
                <svg-icon name="edit" class="h-5 w-5 text-title" />
              </span>
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
            type="text"
            name="lastName"
            :label="$t('user.labels.lastName')"
            :disabled="loading"
            validation="required"
            :element-class="(context, classes) => ['relative'].concat(classes)"
          >
            <template #suffix>
              <span class="absolute right-3 top-1/2 -mt-2.5 cursor-pointer">
                <svg-icon name="edit" class="h-5 w-5 text-title" />
              </span>
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
            v-if="!isChangePass"
            :value="'123456789'"
            type="password"
            :label="$t('auth.labels.password')"
            :disabled="true"
            validation="required"
            :element-class="(context, classes) => ['relative'].concat(classes)"
          >
            <template #suffix>
              <span class="absolute right-3 top-1/2 -mt-2.5 cursor-pointer" @click="isChangePass = !isChangePass">
                <svg-icon name="edit" class="h-5 w-5 text-title" />
              </span>
            </template>
          </FormulateInput>
          <div v-if="isChangePass">
            <div class="text-title text-[17px] font-bold !mb-2">{{ $t('auth.labels.password') }}</div>
            <div class="space-y-6">
              <FormulateInput
                v-model="oldPassword"
                type="password"
                validation="required"
                :placeholder="$t('auth.placeholder.oldPassword')"
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
                v-model="newPassword"
                type="password"
                validation="required"
                :placeholder="$t('auth.placeholder.newPassword')"
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
          </div>
          <div class="grid grid-cols-2 gap-4">
            <BButton class="rounded-lg" @click="cancelUpdateUserInfo">{{ $t('labels.cancel') }}</BButton>
            <BButton v-if="!isChangePass" :isLoading="loading" variant="primary" type="submit" class="rounded-lg">
              {{ $t('labels.update') }}
            </BButton>
            <BButton
              v-else
              :isLoading="loadingChangePassword"
              variant="primary"
              type="button"
              class="rounded-lg"
              @click="handleChangePassword"
            >
              {{ $t('labels.update') }}
            </BButton>
          </div>
        </FormulateForm>
      </div>
    </div>
  </div>
</template>
<script>
import User from '@/models/auth/user'

export default {
  components: {
    BButton: () => import('@/components/button/BButton.vue'),
    BAlert: () => import('@/components/alert/BAlert.vue'),
  },
  emits: ['submit'],
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    success: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Array,
      default: () => [],
    },
    formValues: {
      type: [User, Object],
    },
  },
  data() {
    return {
      isChangePass: false,
      loadingChangePassword: false,
      oldPassword: '',
      newPassword: '',
      loadAvatarError: false,
      hideNoti: false,
    }
  },
  watch: {
    success() {
      setTimeout(() => {
        this.hideNoti = true
      }, 5000)
    },
  },
  methods: {
    handleChangePassword() {
      if (this.oldPassword && this.newPassword) {
        this.$emit('change-password', {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        })
      }
    },
    changeAvatar() {},
    cancelUpdateUserInfo() {
      this.isChangePass = false
      this.$emit('clear')
    },
  },
}
</script>
