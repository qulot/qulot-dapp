<template>
  <div class="section section-6 py-4 lg:py-14">
    <div class="container mx-auto">
      <div class="mb-9 mx-auto text-center">
        <h2 class="font-bold text-title text-[17px] lg:text-2xl mb-4 lg:mb-10">
          {{ $t('aboutUs.simpleSecure.title') }}
        </h2>
        <div
          class="lg:w-[742px] lg:h-[780px] relative flex items-center justify-center mx-auto"
        >
          <div
            class="simple-secure__center w-[182px] h-[212px] mx-auto hidden lg:block"
          >
            <img
              src="/about-us/simple-secure-center.svg"
              alt="simple secure center"
            />
          </div>
          <div
            class="line-arrow-01 items-center justify-center absolute top-1/2 w-full -mt-10 -rotate-90 hidden lg:flex"
          >
            <img
              src="/about-us/simple-secure-arrow.svg"
              class="-rotate-90 mx-40"
              alt="arrow"
            />
            <img
              src="/about-us/simple-secure-arrow.svg"
              class="rotate-90 mx-40"
              alt="arrow"
            />
          </div>
          <div
            class="line-arrow-02 items-center justify-center absolute top-1/2 w-full -mt-10 -rotate-[30deg] hidden lg:flex"
          >
            <img
              src="/about-us/simple-secure-arrow.svg"
              class="-rotate-90 mx-40"
              alt="arrow"
            />
            <img
              src="/about-us/simple-secure-arrow.svg"
              class="rotate-90 mx-40"
              alt="arrow"
            />
          </div>
          <div
            class="line-arrow-03 hidden lg:flex items-center justify-center absolute top-1/2 w-full -mt-10 rotate-[30deg]"
          >
            <img
              src="/about-us/simple-secure-arrow.svg"
              class="-rotate-90 mx-40"
              alt="arrow"
            />
            <img
              src="/about-us/simple-secure-arrow.svg"
              class="rotate-90 mx-40"
              alt="arrow"
            />
          </div>
          <ul class="simple-secure__list grid grid-cols-2 gap-3 lg:block">
            <li
              v-for="(item, index) in simpleSecureList"
              :key="item.name"
              :class="`max-w-[220px] text-center lg:absolute lg:right-1/2 simple-secure__item${
                index + 1
              }`"
            >
              <img :src="item.image" :alt="item.name" class="mb-2 mx-auto" />
              <div class="text-sm">{{ item.name }}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const { t } = useLang()
const simpleSecureList = computed(() => [
  {
    name: t('aboutUs.simpleSecure.simpleSecure1'),
    image: '/about-us/simple-secure-01.svg',
  },
  {
    name: t('aboutUs.simpleSecure.simpleSecure2'),
    image: '/about-us/simple-secure-02.svg',
  },
  {
    name: t('aboutUs.simpleSecure.simpleSecure3'),
    image: '/about-us/simple-secure-03.svg',
  },
  {
    name: t('aboutUs.simpleSecure.simpleSecure4'),
    image: '/about-us/simple-secure-04.svg',
  },
  {
    name: t('aboutUs.simpleSecure.simpleSecure5'),
    image: '/about-us/simple-secure-05.svg',
  },
  {
    name: t('aboutUs.simpleSecure.simpleSecure6'),
    image: '/about-us/simple-secure-01.svg',
  },
])
</script>

<style lang="scss" scoped>
@media (min-width: 1024px) {
  .simple-secure__item1 {
    top: 0;
    transform: translateX(50%);
  }

  .simple-secure__item2 {
    top: 120px;
    transform: translateX(165%);
  }

  .simple-secure__item3 {
    bottom: 160px;
    transform: translateX(165%);
  }

  .simple-secure__item4 {
    bottom: 0;
    transform: translateX(50%);
  }

  .simple-secure__item5 {
    bottom: 160px;
    transform: translateX(-65%);
  }

  .simple-secure__item6 {
    top: 120px;
    transform: translateX(-65%);
  }
}
</style>
