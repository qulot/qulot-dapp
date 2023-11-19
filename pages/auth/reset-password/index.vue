<template>
  <PageAuthResetPassword
    :loading="isLoading"
    :errors="errors"
    @submit="submitResetPassword"
  />
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'

const router = useRouter()
const localePath = useLocalePath()
const authStore = useAuthStore()
const { isLoading, errors } = storeToRefs(authStore)

const submitResetPassword = async (data: any) => {
  if (await authStore.resetPassword(data.email)) {
    router.push(
      localePath({
        name: 'auth-reset-password-confirm',
        query: {
          email: data.email,
        },
      })
    )
  }
}

onUnmounted(() => {
  authStore.clear()
})
</script>
