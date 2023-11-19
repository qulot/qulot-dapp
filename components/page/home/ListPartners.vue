<template>
  <section
    class="bg-[#F3F3F3] dark:bg-[#282042] pt-3 pb-8 lg:py-6 flex items-center text-[#252526] dark:text-[#FFFFFF]"
  >
    <div class="container mx-auto">
      <Carousel :settings="settings" class="h-[100px]">
        <Slide v-for="item in items" :key="item">
          <div class="!flex items-center justify-center p-2 h-full">
            <img :src="item" alt="payment" class="h-full w-auto" />
          </div>
        </Slide>
      </Carousel>
    </div>
  </section>
</template>

<script setup lang="ts">
const settings = ref({
  snapAlign: 'start',
  itemsToShow: 2,
  autoplay: 2000,
  wrapAround: true,
  breakpoints: {
    700: {
      itemsToShow: 3,
    },
    1000: {
      itemsToShow: 4,
    },
  },
})
const items = ref([
  '/partners/Chainlink_Logo.svg',
  '/partners/The-Graph.png',
  '/partners/IBM-Q.png',
  '/partners/google_cloud.svg',
])
</script>
<style lang="scss">
.carousel {
  &__viewport,
  &__track {
    height: 100%;
  }
}
</style>
