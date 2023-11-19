<template>
  <section>
    <div class="container mx-auto">
      <TitleCard
        :title="$t('home.howItWorks')"
        tag="a"
        :title-props="{ href: '#how-it-works' }"
      >
        <template #icon>
          <svg-icon name="hand" class="h-9 w-9" />
        </template>
      </TitleCard>
    </div>
    <div class="container mx-auto">
      <div class="grid gap-4 lg:grid-cols-2 lg:gap-8">
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/kt733JgGnmM"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        <ul class="space-y-2">
          <li
            v-for="step in steps"
            :key="step.step"
            class="flex items-center gap-x-2 lg:gap-x-6 py-4 cursor-pointer rounded hover:bg-[#F3F3F3] hover:dark:bg-block"
          >
            <img
              :src="step.img"
              :alt="step.text"
              class="block md:w-[100px] md:h-[100px]"
            />
            <div class="flex-grow">
              <h2 class="text-title font-bold text-base mb-2 md:text-2xl">
                {{ $t('home.step', { step: step.step }) }}
              </h2>
              <p class="text-sm md:text-base text-content">
                {{ step.text }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
const { t } = useI18n()
const steps = computed(() => [
  {
    step: 1,
    text: t('home.step1'),
    img: '/work/step1Icon.svg',
  },
  {
    step: 2,
    text: t('home.step2'),
    img: '/work/step2Icon.svg',
  },
  {
    step: 3,
    text: t('home.step3'),
    img: '/work/step3Icon.svg',
  },
])
</script>
