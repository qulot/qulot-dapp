<template>
  <PageAuthLogin :loading="isLoading" :errors="errors" @submit="submitLogin" />
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { t } = useI18n()
const router = useRouter()
const localePath = useLocalePath()
const route = useRoute()
const authStore = useAuthStore()
const { isLoading, isAuthenticated, errors } = storeToRefs(authStore)

const submitLogin = async (data: any) => {
  await authStore.login(data.email, data.password, data.rememberMe === true)

  if (isAuthenticated.value) {
    if (route.query.callback) {
      navigateTo(route.query.callback as string)
    } else {
      router.push(
        localePath({
          name: 'success',
          query: {
            title: t('message.successfully'),
            description:
              t('auth.signInSuccess') + '. ' + t('auth.weGladYouHere'),
            link: localePath('/'),
            linkText: t('labels.backToHome'),
          },
        })
      )
    }
  }
}

onUnmounted(() => {
  authStore.clear()
})
</script>
