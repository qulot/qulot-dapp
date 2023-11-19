<template>
  <div class="relative pt-10 lg:pt-16 pb-4 lg:pb-10">
    <div>
      <PageAboutUsInformation />
      <PageAboutUsOurServices />
      <PageAboutUsGuidelines />
      <PageAboutUsBusinessModel />
      <PageAboutUsTrackRecord />
      <PageAboutUsSimpleSecure />
    </div>
  </div>
</template>
<script setup lang="ts">
const config = useRuntimeConfig()
const { t } = useI18n()
const title = computed(
  () => `${t('footer.linkAboutUs')} | ${config.public.metadata.appName}`
)

useSeoMeta({
  title,
  ogTitle: title,
})
</script>
