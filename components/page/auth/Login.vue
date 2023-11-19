<template>
  <div class="space-y-6">
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

        <FormKit
          :placeholder="$t('auth.placeholderPassword')"
          :label="$t('user.password')"
          :type="showPassword ? 'text' : 'password'"
          :disabled="loading"
          name="password"
          validation="required"
          autocomplele="current-password"
          suffix-icon="eyeClosed"
          @suffix-icon-click="handleIconClick"
        >
          <template #help="{ classes }">
            <NuxtLink
              :to="localePath('/auth/reset-password')"
              :class="classes.help"
            >
              {{ $t('auth.forgotYourPassword') }}
            </NuxtLink>
          </template>
        </FormKit>

        <FormKit
          type="checkbox"
          name="rememberMe"
          :label="$t('auth.rememberMe')"
          :label-class="'ml-2 text-label'"
          outer-class="mb-0"
        />

        <Button
          :is-loading="loading"
          variant="primary"
          type="submit"
          class="w-full rounded-lg"
        >
          {{ $t('auth.login') }}
        </Button>
      </div>
    </FormKit>

    <!-- Google login button -->
    <Button
      type="button"
      rounded
      class="space-x-2 text-title w-full"
      :is-loading="loginWithGoogleLoading"
      @click="loginWithGoogle"
    >
      <svg-icon name="google" class="h-4 w-4" />
      <span>{{ $t('auth.withGoogle') }}</span>
    </Button>

    <div
      class="flex items-center justify-center space-x-2 text-[17px] text-subtitle"
    >
      <span>{{ $t('auth.notAccount') }}</span>
      <NuxtLink
        :to="localePath('/auth/register')"
        class="font-bold text-main hover:underline"
      >
        {{ $t('auth.signupNow') }}
      </NuxtLink>
    </div>
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

const { signIn } = useOidc()
const localePath = useLocalePath()

const showPassword = ref(false)
const loginWithGoogleLoading = ref(false)

const handleIconClick = (node: any, e: any) => {
  node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
  node.props.type = node.props.type === 'password' ? 'text' : 'password'
}

const loginWithGoogle = async () => {
  loginWithGoogleLoading.value = true
  try {
    await signIn('google', true)
  } catch (error) {
    console.log(error)
  } finally {
    loginWithGoogleLoading.value = false
  }
}
</script>
