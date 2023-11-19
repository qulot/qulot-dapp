<template>
  <section class="bg-gradient-to-r from-[#6135E9] to-[#27B1FF] py-4">
    <div class="container mx-auto">
      <TitleCard
        :title="$t('home.luckiestWinners')"
        tag="a"
        :title-props="{ href: '#luckiest-winners', class: 'text-white' }"
      >
        <template #icon>
          <svg-icon name="cup" class="h-9 w-9" />
        </template>
      </TitleCard>
    </div>
    <div class="container mx-auto">
      <Carousel :settings="settings">
        <Slide v-for="item in ranks" :key="item">
          <div
            class="!flex items-center h-full space-x-1 whitespace-nowrap text-white py-2"
          >
            <svg-icon :name="item.rank" class="w-10" />
            <a href="#" class="font-bold">{{
              readableAddress(item.address)
            }}</a>
            <span class="text-sm">{{ $t('home.wonWithAmount') }}</span>
            <TokenValue :value="item.prize" class="font-bold text-main" />
            <svg-icon name="dolla" class="w-4 h-4"></svg-icon>
          </div>
        </Slide>
      </Carousel>
    </div>
  </section>
</template>

<script setup lang="ts">
import { BigNumber } from 'ethers'

export interface RankItemType {
  rank: any
  address: string
  prize: BigNumber
}

defineProps({
  ranks: {
    type: Array as PropType<RankItemType[]>,
    default: () => [],
    required: false,
  },
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
      itemsToShow: 1.6,
    },
    900: {
      itemsToShow: 2,
    },
    1000: {
      itemsToShow: 2.5,
    },
    1200: {
      itemsToShow: 3,
    },
    1400: {
      itemsToShow: 3.3,
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
