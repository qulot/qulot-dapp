<template>
  <div class="section section-1 bg-[#3501A4] relative">
    <div
      class="container mx-auto flex lg:items-center min-h-[550px] lg:min-h-[530px] relative pt-11 lg:pt-0 z-10"
    >
      <div class="-translate-y-10 text-center lg:text-left">
        <div
          class="font-bold text-[17px] lg:text-2xl text-white mb-2 py-10 relative inline-block"
        >
          <span>{{ $t('aboutUs.information.title') }}</span>
          <img
            src="/about-us/bg-title-section-1.svg"
            alt=""
            class="w-[172px] lg:w-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-none"
          />
        </div>
        <div class="text-sm text-white max-w-[605px] space-y-4">
          <p>
            {{ $t('aboutUs.information.content') }}
          </p>
          <p>{{ $t('aboutUs.information.operatedBy') }}</p>
        </div>
      </div>
      <div>
        <img
          src="/about-us/top-center.svg"
          alt=""
          class="max-w-[250px] lg:max-w-[650px] 2xl:max-w-full absolute right-1/2 translate-x-1/2 lg:translate-x-0 lg:-right-24 bottom-0"
        />
      </div>
    </div>
    <div>
      <img
        src="/about-us/top-left.svg"
        alt=""
        class="hidden 2xl:block absolute left-0 bottom-0"
      />
    </div>
    <div>
      <img
        src="/about-us/top-right.svg"
        alt=""
        class="hidden lg:block lg:max-w-[200px] absolute right-0 bottom-0"
      />
    </div>
  </div>
</template>
<script setup lang="ts"></script>
