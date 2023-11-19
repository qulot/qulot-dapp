<template>
  <section class="">
    <div class="container mx-auto">
      <TitleCard
        :title="$t('home.innovativeFeatures')"
        tag="a"
        :title-props="{ href: '#innovative-features' }"
      >
        <template #icon>
          <svg-icon name="rocket" class="h-9 w-9" />
        </template>
      </TitleCard>
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div
          v-for="(feature, index) in listFeature"
          :key="index"
          class="flex space-x-4 lg:space-x-0 lg:flex-col lg:space-y-8 items-center justify-center py-2 lg:py-8 cursor-pointer rounded hover:bg-[#F3F3F3] hover:dark:bg-block text-center"
        >
          <img
            :src="feature.image"
            alt="image"
            class="w-[90px] h-[90px] lg:w-[140px] lg:h-[140px]"
          />
          <p class="flex-grow text-sm text-start text-content lg:text-center">
            {{ feature.content }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
const { t } = useI18n()
const listFeature = computed(() => [
  {
    image: '/feature/Group 34284.svg',
    content: t('home.directlyEngageBillionsUsers'),
  },
  {
    image: '/feature/Group 34440.svg',
    content: t('home.dailyDrawAndSocialInteraction'),
  },
  {
    image: '/feature/Group 34289.svg',
    content: t('home.blockchainTechnology'),
  },
  {
    image: '/feature/Group 34441.svg',
    content: t('home.noScam'),
  },
])
</script>
