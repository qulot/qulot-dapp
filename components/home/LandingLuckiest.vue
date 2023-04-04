<template>
  <section class="bg-gradient-to-r from-[#6135E9] to-[#27B1FF] py-4">
    <div class="container mx-auto">
      <TitleCard :title="$t('home.luckiestWinners')" tag="a" :title-props="{ href: '#luckiest-winners' }">
        <template #icon>
          <svg-icon name="cup" class="h-9 w-9" />
        </template>
      </TitleCard>
    </div>
    <div class="container mx-auto">
      <Carousel :settings="settings">
        <Slide v-for="item in ranks" :key="item">
          <div class="!flex items-center h-full space-x-1 whitespace-nowrap py-2 text-black">
            <svg-icon :name="item.rank" class="w-10" />
            <a href="#" class="font-bold">{{ readableAddress(item.address) }}</a>
            <span class="text-sm">{{ $t("home.wonWithAmount") }}</span>
            <span class="font-bold text-main">{{ item.prize }}</span>
            <svg-icon name="dolla" class="w-4 h-4"></svg-icon>
          </div>
        </Slide>
      </Carousel>
    </div>
  </section>
</template>

<script setup lang="ts">
export interface RankItemType {
  rank: any;
  address: string;
  prize: string
}

defineProps({
  ranks: Object as PropType<RankItemType[]>
})

const settings = ref({
  snapAlign: 'start',
  itemsToShow: 1,
  autoplay: 2000,
  wrapAround: true,
  breakpoints: {
    500: {
      itemsToShow: 1.3,
    },
    700: {
      itemsToShow: 1.4,
    },
    900: {
      itemsToShow: 1.7,
    },
    1100: {
      itemsToShow: 2.3,
    },
    1400: {
      itemsToShow: 2.9,
    },
  },
})

const readableAddress = (address: string) => {
  return truncateEthAddress(address)
}
</script>

<style lang="scss" scoped>
.rank-item {
  .rank-item__link {
    opacity: 0;
    transition: all 0.35s ease;
  }

  &:hover {
    .rank-item__link {
      opacity: 1;
    }
  }
}
</style>
