<template>
  <div
    class="p-4 rounded-lg bg-gray dark:bg-block border border-solid"
    :class="active ? 'border-main' : 'border-default'"
  >
    <div class="lg:flex items-center space-y-2 lg:space-y-0 lg:-mx-3">
      <div class="space-x-4 flex lg:items-center lg:w-1/2 lg:px-3">
        <span class="h-10 w-10 bg-white flex items-center justify-center rounded-full">
          <svg-icon :name="type === 'phone' ? 'mobile-active' : 'email-check'" class="h-6 w-6" />
        </span>
        <div>
          <div class="text-sm font-bold" :class="active ? 'text-title' : 'text-disable'">
            {{ nameMethodVerify }}
          </div>
          <p class="text-disable text-sm">{{ $t('user.labels.verifyDescription') }}</p>
        </div>
      </div>
      <div class="flex flex-wrap lg:w-1/2 lg:px-3">
        <p
          class="font-bold text-sm flex items-center space-x-2 pl-14 lg:pl-0 mr-auto"
          :class="active ? 'text-title' : 'text-disable'"
        >
          <svg-icon name="circle-tick" class="w-4 h-4" :class="active ? 'text-main' : 'text-disable'" />
          <span v-if="type === 'phone'">{{ value | hidePhone }}</span>
          <span v-else>{{ value }}</span>
        </p>
        <div class="w-full xl:w-auto space-x-4 text-title text-sm pl-14 lg:pl-0 my-2">
          <span class="cursor-pointer hover:text-red-500" @click="removeVerify">{{ $t('labels.delete') }}</span>
          <span class="cursor-pointer hover:text-main" @click="toggleChange">{{
            isChange ? $t('labels.cancel') : $t('labels.change')
          }}</span>
        </div>
      </div>
    </div>
    <div v-show="isChange" class="bg-body rounded-lg p-4 pb-5 mt-6 sidedown">
      <div class="space-y-4 lg:space-y-0 lg:flex lg:space-x-6">
        <FormulateInput
          v-if="type === 'phone'"
          type="phonenumber"
          name="phone"
          :label="$t('user.labels.newPhoneNumber')"
          class="lg:w-1/2"
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
          v-else
          type="text"
          name="email"
          :placeholder="$t('auth.placeholder.email')"
          :label="$t('user.labels.newEmail')"
          validation="required|email"
          class="lg:w-1/2"
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
          type="text"
          name="otp"
          v-model="codeVerify"
          :placeholder="$t('user.labels.inputNewCodeVerify')"
          :label="$t('user.labels.codeVerify')"
          validation="required|number"
          class="lg:w-1/2"
          :element-class="(context, classes) => ['relative'].concat(classes)"
          @keyup.enter="verify"
        >
          <template #label="{ label }">
            <div class="flex items-center justify-between mb-2">
              <div class="font-bold text-[17px] text-title">{{ label }}</div>
              <span class="text-sm cursor-pointer hover:text-main" @click="getCodeAgain">{{
                $t('user.labels.resendCode')
              }}</span>
            </div>
          </template>
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChangeVerify',
  props: {
    type: {
      type: String,
      default: 'phone',
    },
    active: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isChange: false,
      codeVerify: '',
    }
  },
  computed: {
    nameMethodVerify() {
      return this.type === 'phone' ? this.$t('user.labels.verifyByPhone') : this.$t('user.labels.verifyByEmail')
    },
  },
  watch: {
    codeVerify(val) {
      if (val.length === 4) {
        this.verify()
      }
    },
  },
  methods: {
    getCodeAgain() {},
    toggleChange() {
      this.isChange = !this.isChange
    },
    removeVerify() {
      this.$emit('delete')
    },
    verify() {},
    handleSubmit() {},
  },
}
</script>
