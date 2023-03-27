<template>
  <section>
    <div class="container mx-auto">
      <TitleCard title="Luckiest winners">
        <template #icon>
          <svg-icon name="cup" class="h-9 w-9" />
        </template>
        <template #action>
          <a href="#" class="text-sm font-bold text-title hover:text-main" @click.prevent="() => {}">{{
            $t('labels.viewAll')
          }}</a>
        </template>
      </TitleCard>
      <ul v-if="listRank">
        <li
          v-for="(item, index) in listRank"
          :key="index"
          class="
            rank-item
            flex
            items-center
            space-x-4
            lg:space-x-6
            py-2
            lg:py-4
            first:pt-0
            border-b border-dotted border-[#E9E9E9]
            cursor-pointer
          "
          @click="viewDetail()"
        >
          <div class="w-10 lg:w-[60px]">
            <img v-if="item.rankUrl !== ''" :src="item.rankUrl" :alt="item.title" class="w-10 lg:w-[60px]" />
            <p v-else class="text-black text-base text-center font-bold">
              {{ item.id }}
            </p>
          </div>
          <div class="flex-1">
            <p class="text-sm flex flex-wrap items-center space-x-1">
              <span class="text-black font-bold">{{ item.userName }}...</span>
              <span>Đã thắng Lotery 5D với số tiền</span>
              <span class="font-bold text-[#6135E9] flex items-center flex-1">
                {{ item.prize }}
                <svg-icon name="dolla" class="ml-1 w-4 h-4"></svg-icon>
              </span>
            </p>
          </div>
          <a href="#" class="hidden lg:block rank-item__link hover:text-main cursor-pointer" @click="viewDetail()">
            <svg-icon name="external-link" class="h-4 w-4" />
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
import rank1 from '~/static/luckiest/rank1.svg'
import rank2 from '~/static/luckiest/rank2.svg'
import rank3 from '~/static/luckiest/rank3.svg'

export default {
  components: { TitleCard: () => import('@/components/titlecard/TitleCard.vue') },
  data() {
    return {
      listRank: [
        {
          id: 1,
          userName: 'Oxc123456789',
          prize: '100,000,000',
          rankUrl: rank1,
          title: 'rank1',
        },
        {
          id: 2,
          userName: 'Oxc123456799',
          prize: '50,000,000',
          rankUrl: rank2,
          title: 'rank2',
        },
        {
          id: 3,
          userName: 'Oxc1234567234',
          prize: '10,000,000',
          rankUrl: rank3,
          title: 'rank3',
        },
        {
          id: 4,
          userName: 'Oxc1234567345',
          prize: '2,000,000',
          rankUrl: '',
          title: '',
        },
        {
          id: 5,
          userName: 'Oxc123456755',
          prize: '1,000,000',
          rankUrl: '',
          title: '',
        },
      ],
    }
  },
  methods: {
    viewDetail() {},
  },
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
