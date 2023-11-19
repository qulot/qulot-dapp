<template>
  <PageAuthRegisterByEmail
    :loading="isLoading"
    :errors="errors"
    @submit="submitRegister"
  />
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'

const router = useRouter()
const localePath = useLocalePath()
const authStore = useAuthStore()
const { isLoading, user, errors } = storeToRefs(authStore)

const submitRegister = async (data: any) => {
  await authStore.registerUser({
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    password: data.password,
  })

  if (errors.value.length === 0 && user.value) {
    router.push(
      localePath({
        name: 'auth-register-active',
        query: { email: user.value.email },
      })
    )
  }
}

onUnmounted(() => {
  authStore.clear()
})
</script>
