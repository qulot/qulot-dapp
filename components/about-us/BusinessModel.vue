<template>
  <div class="section section-4 py-4 lg:py-24">
    <div
      class="container mx-auto lg:flex lg:space-x-11 lg:items-center space-y-4 lg:space-y-0"
    >
      <div class="max-w-[418px] text-center lg:text-left">
        <h2 class="font-bold text-title text-[17px] lg:text-2xl mb-4">
          {{ $t('aboutUs.businessModel.title') }}
        </h2>
        <div class="text-black text-sm">
          {{ $t('aboutUs.businessModel.desc') }}
        </div>
      </div>
      <div class="px-14 lg:px-0">
        <img
          src="/about-us/our-business-model.svg"
          alt=""
          class="max-w-full h-auto"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
