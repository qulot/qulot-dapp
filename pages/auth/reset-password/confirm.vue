<template>
  <PageAuthConfirmResetPassword
    :loading="isLoading"
    :errors="errors"
    :email="route.query.email"
    @submit="confirmResetPassword"
  />
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()
const authStore = useAuthStore()
const { isLoading, errors } = storeToRefs(authStore)

definePageMeta({
  validate: (route) => {
    return !isEmpty(route.query.email as string)
  },
})

const confirmResetPassword = async (data: any) => {
  if (
    await authStore.confirmResetPassword(
      route.query.email,
      data.password,
      data.otp
    )
  ) {
    router.push(
      localePath({
        name: 'success',
        query: {
          title: t('message.successfully'),
          description: t('auth.signInSuccess') + '. ' + t('auth.weGladYouHere'),
          link: localePath('/auth/login'),
          linkText: t('auth.login'),
        },
      })
    )
  }
}

onUnmounted(() => {
  authStore.clear()
})
</script>
