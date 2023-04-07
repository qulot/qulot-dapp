<template>
  <div class="section section-2 py-4 lg:py-14">
    <div class="container mx-auto">
      <div class="title max-w-[512px] mb-8 mx-auto text-center">
        <h2 class="font-bold text-title text-[17px] lg:text-2xl mb-4">
          {{ $t('aboutUs.guide.title') }}
        </h2>
      </div>
      <div
        class="list-step grid grid-cols-1 gap-y-6 lg:grid-cols-3 lg:gap-y-[127px]"
      >
        <div v-for="step in steps" :key="step.name" class="text-center">
          <img :src="step.icon" :alt="step.name" class="mb-2 mx-auto" />
          <div class="font-bold text-title text-[17px] mb-2">
            {{ step.name }}
          </div>
          <div class="max-w-[240px] mx-auto text-sm text-black">
            {{ step.desc }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const { t } = useI18n()
const steps = computed(() => [
  {
    name: t('aboutUs.guide.step1.name'),
    desc: t('aboutUs.guide.step1.desc'),
    icon: '/about-us/step-1.svg',
  },
  {
    name: t('aboutUs.guide.step2.name'),
    desc: t('aboutUs.guide.step2.desc'),
    icon: '/about-us/step-2.svg',
  },
  {
    name: t('aboutUs.guide.step3.name'),
    desc: t('aboutUs.guide.step3.desc'),
    icon: '/about-us/step-3.svg',
  },
  {
    name: t('aboutUs.guide.step4.name'),
    desc: t('aboutUs.guide.step4.desc'),
    icon: '/about-us/step-4.svg',
  },
  {
    name: t('aboutUs.guide.step5.name'),
    desc: t('aboutUs.guide.step5.desc'),
    icon: '/about-us/step-5.svg',
  },
  {
    name: t('aboutUs.guide.step6.name'),
    desc: t('aboutUs.guide.step6.desc'),
    icon: '/about-us/step-6.svg',
  },
])
</script>
<style lang="scss" scoped>
.container {
  background-image: url('/about-us/bg-steps.svg');
  background-repeat: no-repeat;

  @media (max-width: 1024px) {
    background-position: center;
    background-repeat: repeat-y;
  }
}

@media (min-width: 1024px) {
  .list-step {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 200px;
      left: 0;
      top: 80px;
      background-image: url('/about-us/bg-steps-1.svg');
      background-size: cover;
      z-index: -1;
    }

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 181px;
      left: 0;
      top: 274px;
      background-image: url('/about-us/bg-steps-2.svg');
      background-size: cover;
      z-index: -1;
    }
  }
}
</style>
