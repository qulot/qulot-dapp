<template>
  <section class="pt-6">
    <div class="container mx-auto">
      <TitleCard :title="$t('home.1stPlatform')" tag="a" :title-props="{ href: '#1st-platform' }">
        <template #icon>
          <svg-icon name="crown" class="h-9 w-9" />
        </template>
      </TitleCard>
      <div class="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div class="flex flex-col justify-center">
          <p class="text-sm text-black">
            {{ $t("home.customLottery") }}
          </p>
          <p class="text-sm text-black">
            {{ $t("home.blockchainBenefitForCharities") }}
          </p>
        </div>
        <div class="lg:pl-12">
          <img src="/platform/Image.svg" alt="platform_image" class="w-full" />
        </div>
      </div>
    </div>
  </section>
</template>
