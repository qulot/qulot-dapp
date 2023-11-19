<template>
  <div class="flex flex-col justify-center pt-16 pb-6 container mx-auto">
    <Breadcrumb :list="[{ name: $t('auth.login'), url: '' }]" />
    <div class="lg:py-6 px-4">
      <div class="sm:mx-auto sm:w-full sm:max-w-md mb-6">
        <div>
          <p
            class="text-xl font-bold leading-tight text-center mb-0 lg:text-2xl text-title"
          >
            {{ $t('auth.login') }}
          </p>
        </div>
      </div>
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const config = useRuntimeConfig()
const { t } = useI18n()

const title = computed(
  () => `${t('auth.login')} | ${config.public.metadata.appName}`
)

useSeoMeta({
  title,
  ogTitle: title,
})
</script>
