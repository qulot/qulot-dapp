<template>
  <section class="container mx-auto flex flex-col items-center">
    <div class="-mb-10">
      <img src="/success.svg" alt="" class="max-w-full h-auto" />
    </div>

    <div class="font-bold text-2xl lg:text-5xl mb-4 mt-2 text-main">
      {{ title }}
    </div>

    <div class="text-sm lg:text-2xl text-title mb-4 text-center">
      {{ description }}
    </div>
    <nuxt-link :to="link" class="bg-main rounded px-4 py-3 text-white text-sm">
      {{ linkText }}
    </nuxt-link>
  </section>
</template>
<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'Success!',
  },
  description: {
    type: String,
    default: "Logged in successfully. We're glad you're here",
  },
  link: {
    type: String,
    default: '/',
  },
  linkText: {
    type: String,
    default: () => {
      const i18n = useI18n()
      return i18n.t('labels.backToHome')
    },
  },
})
</script>
