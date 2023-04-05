<template>
  <div class="section section-5 py-4 lg:py-24">
    <div
      class="container mx-auto flex flex-col lg:flex-row lg:space-x-11 lg:items-center lg:justify-end text-center lg:text-left">
      <div class="order-last lg:order-first px-14 lg:px-0">
        <img src="/about-us/our-track-record.svg" alt="" class="max-w-full h-auto" />
      </div>
      <div class="max-w-[418px] mb-4 lg:mb-0">
        <h2 class="font-bold text-title text-[17px] lg:text-2xl mb-4">
          {{ $t('aboutUs.trackRecord.title') }}
        </h2>
        <div class="text-black text-sm">
          {{ $t('aboutUs.trackRecord.desc') }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>