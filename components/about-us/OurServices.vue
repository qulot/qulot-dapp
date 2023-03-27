<template>
  <div class="section section-2 bg-[#F3EFFF] dark:bg-block py-4 lg:py-14">
    <div class="container mx-auto">
      <div class="max-w-[512px] mb-9 mx-auto text-center">
        <h2 class="font-bold text-title text-[17px] lg:text-2xl mb-4">{{ $t('aboutUs.services.title') }}</h2>
        <div class="font-bold text-xs lg:text-sm text-title">
          {{ $t('aboutUs.services.subtitle') }}
        </div>
      </div>
      <div class="lg:flex justify-center lg:space-x-10 xl:space-x-20 space-y-4 lg:space-y-0">
        <div
          class="
            rounded-lg
            bg-white
            px-4
            py-6
            lg:px-6 lg:py-8
            text-sm
            lg:max-w-[283px]
            text-center
            flex flex-col
            items-center
            space-y-6
            hover:shadow-default
          "
        >
          <img src="/about-us/about-feature-01.svg" alt="" />
          <div v-html="$t('aboutUs.services.service1')"></div>
        </div>
        <div
          class="
            rounded-lg
            bg-white
            px-4
            py-6
            lg:px-6 lg:py-8
            text-sm
            lg:max-w-[283px]
            text-center
            flex flex-col
            items-center
            space-y-6
            hover:shadow-default
          "
        >
          <img src="/about-us/about-feature-02.svg" alt="" />
          <div v-html="$t('aboutUs.services.service2')"></div>
        </div>
        <div
          class="
            rounded-lg
            bg-white
            px-4
            py-6
            lg:px-6 lg:py-8
            text-sm
            lg:max-w-[283px]
            text-center
            flex flex-col
            items-center
            space-y-6
            hover:shadow-default
          "
        >
          <img src="/about-us/about-feature-03.svg" alt="" />
          <div v-html="$t('aboutUs.services.service3')"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OurServices',
}
</script>
