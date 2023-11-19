<template>
  <section class="container mx-auto pt-24 pb-4 lg:pb-14 lg:px-20">
    <div class="space-x-2">
      <svg-icon
        name="loader"
        class="animate-[spin_2s_linear_infinite] w-6 h-6 mix-blend-difference"
      />
      <span class="text-sm lg:text-2xl text-title mb-4">
        {{ $t('message.processingPlsWaitSecond') }}
      </span>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'

definePageMeta({
  validate: (route) => {
    return route.query.code != null && route.params.provider != null
  },
})

const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()
const { t } = useI18n()
const { resolveRedirectUrl } = useOidc()
const authStore = useAuthStore()
const { isAuthenticated, errors } = storeToRefs(authStore)

onMounted(async () => {
  await authStore.loginWithOIDC(
    route.params.provider as string,
    route.query.code as string
  )
  if (errors.value && errors.value.length) {
    throw createError({
      statusCode: 500,
      statusMessage: errors.value[0],
      fatal: true,
    })
  } else if (isAuthenticated.value) {
    const redirectUrl = await resolveRedirectUrl(
      route.params.provider as string
    )

    if (redirectUrl) {
      navigateTo(redirectUrl)
    } else {
      router.push(
        localePath({
          name: 'success',
          query: {
            title: t('message.successfully'),
            description:
              t('auth.signInSuccess') + '. ' + t('auth.weGladYouHere'),
            link: '/',
            linkText: t('labels.backToHome'),
          },
        })
      )
    }
  }
})

onUnmounted(() => {
  authStore.clear()
})
</script>
