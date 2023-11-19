<template>
  <PageAuthCheckOtp
    :loading="isLoading"
    :errors="errors"
    :email="email"
    @submit="submitCheckOTP"
  />
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'

definePageMeta({
  validate: (route) => {
    return route.query.email != null
  },
})

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()
const authStore = useAuthStore()
const { isLoading, user, errors } = storeToRefs(authStore)

const email = computed(() => route.query.email)

const submitCheckOTP = async (data: any) => {
  if (route.query.email && data.otp) {
    await authStore.activeUser(route.query.email as string, data.otp)

    if (user.value && user.value.isConfirmed) {
      router.push(
        localePath({
          name: 'success',
          query: {
            title: t('message.successfully'),
            description:
              t('auth.signUpSuccess') + '. ' + t('auth.weGladYouHere'),
            link: localePath('/auth/login'),
            linkText: t('auth.login'),
          },
        })
      )
    }
  }
}
</script>
