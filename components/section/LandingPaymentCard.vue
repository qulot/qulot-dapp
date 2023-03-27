<template>
  <section
    class="
      bg-[#F3F3F3]
      dark:bg-[#282042]
      pt-3
      pb-8
      lg:py-6 lg:min-h-[200px]
      flex
      items-center
      text-[#252526]
      dark:text-[#FFFFFF]
    "
  >
    <div class="container mx-auto">
      <VueSlickCarousel :arrows="false" :dots="true" v-bind="settings">
        <div class="!flex items-center justify-center p-2 h-full">
          <img src="~/static/payment/paypal.svg" alt="payment" class="max-w-full h-auto" />
        </div>
        <div class="!flex items-center justify-center p-2 h-full">
          <img src="~/static/payment/cashapp.svg" alt="payment" class="max-w-full h-auto" />
        </div>
        <div class="!flex items-center justify-center p-2 h-full">
          <img src="~/static/payment/payoneer.svg" alt="payment" class="max-w-full h-auto" />
        </div>
        <div class="!flex items-center justify-center p-2 h-full">
          <img src="~/static/payment/trustly.svg" alt="payment" class="max-w-full h-auto" />
        </div>
        <div class="!flex items-center justify-center p-2 h-full">
          <img src="~/static/payment/webmoney.svg" alt="payment" class="max-w-full h-auto" />
        </div>
        <div class="!flex items-center justify-center p-2 h-full">
          <img src="~/static/payment/paypal.svg" alt="payment" class="max-w-full h-auto" />
        </div>
        <template #customPaging>
          <div class="w-2.5 h-2 bg-[#A8A8A8] hover:cursor-pointer rounded-sm"></div>
        </template>
      </VueSlickCarousel>
    </div>
  </section>
</template>
<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'

export default {
  components: {
    VueSlickCarousel,
  },
  data() {
    return {
      isActive: true,
      settings: {
        infinite: true,
        slidesToShow: 5,
        speed: 300,
        rows: 1,
        slidesPerRow: 1,
        responsive: [
          {
            breakpoint: 1023,
            settings: {
              rows: 2,
              slidesToShow: 3,
            },
          },
        ],
      },
    }
  },
}
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
