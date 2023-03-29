<template>
  <section
    class="bg-[#F3F3F3] dark:bg-[#282042] pt-3 pb-8 lg:py-6 lg:min-h-[200px] flex items-center text-[#252526] dark:text-[#FFFFFF]"
  >
    <div class="container mx-auto">
      <Carousel :settings="settings">
        <Slide v-for="item in items" :key="item">
          <div class="!flex items-center justify-center p-2 h-full">
            <img :src="item" alt="payment" class="max-w-full h-auto" />
          </div>
        </Slide>

        <template #addons>
          <Pagination />
        </template>
        <template #customPaging>
          <div
            class="w-2.5 h-2 bg-[#A8A8A8] hover:cursor-pointer rounded-sm"
          ></div>
        </template>
      </Carousel>
    </div>
  </section>
</template>

<script setup lang="ts">
const settings = ref({
  itemsToShow: 5,
  snapAlign: 'center',
})
const items = ref([
  '/payment/paypal.svg',
  '/payment/cashapp.svg',
  '/payment/payoneer.svg',
  '/payment/trustly.svg',
  '/payment/webmoney.svg',
  '/payment/paypal.svg',
])
</script>
<style lang="scss">
.slick-track {
  display: flex !important;
}

.slick-slide {
  height: inherit !important;
  display: flex !important;
  flex-flow: wrap;
}

.slick-dots {
  position: absolute;
  bottom: -48px;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  text-align: center;

  li {
    position: relative;
    display: inline-block;
    margin: 0 4px;
    padding: 0;

    > div {
      width: 10px;
      transition: all 0.35s ease;
    }

    &.slick-active {
      > div {
        transition: all 0.35s ease;
        background: #13ccdf;
        width: 16px;
      }
    }
  }
}

@media (max-width: 1023px) {
  .slick-dots {
    bottom: -20px;
  }
}
</style>
