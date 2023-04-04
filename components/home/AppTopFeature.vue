<template>
  <section
    class="relative overflow-hidden section-welcome bg-cover bg-no-repeat bg-center bg-[url('/banner/bg-banner-top.png')]">
    <div class="container mx-auto relative z-10">
      <div class="flex flex-wrap items-center">
        <div class="w-full lg:w-1/2 2xl:w-6/12 text-white text-center lg:text-start">
          <div class="lg:max-w-[718px] pt-24 lg:pt-0 -mb-24 lg:mb-0">
            <h1 class="relative text-3xl mb-2" v-html="$t('home.theWorldFirstBlockchain')">
            </h1>
            <p>
              {{ $t("home.solution") }}
            </p>
          </div>
        </div>
        <div class="w-full lg:w-1/2 2xl:w-6/12">
          <div class="mx-auto w-full relative z-10 flex items-end justify-center min-h-[520px]">
            <img src="/banner/lucky-machine.svg" alt="lucky-machine" class="max-w-[unset]" />
            <div class="absolute text-[#0CDEF4] text-center text-base font-bold bottom-[345px] mr-[10px]">
              {{ $t("home.winner") }}
            </div>
            <div class="absolute text-white text-center bottom-[258px] mr-[10px]">
              <div class="text-xs">{{ $t("home.totalPrize") }}</div>
              <div class="text-base font-bold">{{ formatTotalPrize }}</div>
            </div>
            <div class="absolute text-white text-center bottom-[182px] mr-[10px]">
              <div class="text-xs">{{ $t("home.totalPlayers") }}</div>
              <div class="text-base font-bold">{{ formatTotalUsers }}</div>
            </div>
            <div class="absolute bottom-[95px] -mr-[30px] text-white">
              <a href="#" class="flex items-center justify-center space-x-4">
                <span class="text-base font-extrabold">{{
                  $t('product.labels.playNow')
                }}</span>
                <svg-icon name="arrow-right-circle" class="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <img src="/banner/coin-scattered-left.svg" alt="" class="hidden lg:block absolute -bottom-[35px] -left-[35px]" />
    <img src="/banner/coin-scattered-right.svg" alt="" class="hidden lg:block absolute top-[30px] -right-[100px]" />
  </section>
</template>
<script setup lang="ts">
const props = defineProps(["totalPrize", "totalUsers"])

const formatTotalUsers = computed(() => formatNumber(props.totalUsers))
const formatTotalPrize = computed(() => formatUSD(props.totalPrize, 0))

</script>
<style lang="scss">
.keyword {
  position: relative;
  color: #F5A938;
  font-weight: bold;

  &::before {
    position: absolute;
    content: "";
    background-image: url(/_nuxt/bg/lottery-border.svg);
    background-repeat: no-repeat;
    background-size: contain;
    width: 120%;
    height: 110%;
    left: -7px;
  }
}
</style>