<template>
  <div class="relative text-sm text-title-nodark">
    <div
      class="
        overflow-hidden
        box-border
        relative
        before:content-[''] before:absolute before:h-3 before:w-3 before:rounded-full before:bg-white
        dark:before:bg-block
        before:left-0 before:top-1/2 before:-mt-1.5 before:-ml-1.5 before:border before:border-solid
        after:content-[''] after:absolute after:h-3 after:w-3 after:rounded-full after:bg-white
        dark:after:bg-block
        after:right-0 after:top-1/2 after:-mr-1.5 after:-mt-1.5 after:border after:border-solid
      "
      :class="data.win ? 'before:border-[#FF228C] after:border-[#FF228C]' : 'before:border-white after:border-white'"
    >
      <div
        class="
          bg-[#F3EFFF]
          rounded
          lg:rounded-lg
          p-3
          xl:p-4
          border border-solid
          min-h-[100px]
          lg:flex
          items-center
          space-y-3
          lg:space-y-0 lg:space-x-4
          xl:space-x-8
        "
        :class="data.win ? 'border-[#FF228C]' : 'border-[#F3EFFF]'"
      >
        <!-- 1 -->
        <div class="flex items-center">
          <div class="w-[70px] h-[70px] rounded overflow-hidden mr-2 lg:mr-4">
            <img class="inset-0" src="/ticket/demo-01.svg" alt="thumbnail" />
          </div>
          <div>
            <div class="text-[17px] font-bold text-title-nodark leading-tight mb-3">{{ data.name }}</div>
            <div class="flex items-center space-x-2">
              <div v-for="(num, i) in data.numbers" :key="i">
                <CircleItem :number="num" />
              </div>
            </div>
          </div>
        </div>
        <div class="w-px h-10 bg-[#D8D8D8] hidden lg:block"></div>
        <!-- 2 -->
        <div class="pl-[78px] lg:pl-0">
          <Select v-model="currency" :options="listCurrencyOptions" class-label="!border-none">
            <template #label="{ label }">
              <div v-if="label" class="flex items-center space-x-2 text-title-nodark -ml-4">
                <span class="w-4 h-4 overflow-hidden rounded-full">
                  <img class="max-w-full h-auto" :src="label.icon" :alt="label.title" />
                </span>
                <span>{{ label.title }}</span>
              </div>
            </template>
            <template #option="{ option }">
              <div v-if="option" class="flex space-x-2">
                <span class="w-4 h-4 overflow-hidden rounded-full">
                  <img class="max-w-full h-auto" :src="option.icon" :alt="option.title" />
                </span>
                <span>{{ option.title }}</span>
              </div>
            </template>
          </Select>
          <div class="flex items-center space-x-1 leading-tight">
            <span class="text-[17px] font-bold text-title-nodark">0.99998</span
            ><span class="text-[11px] text-[#5A5A5A]">$</span>
          </div>
        </div>
        <div class="w-px h-10 bg-[#D8D8D8] hidden lg:block"></div>
        <!-- 3 -->
        <div class="lg:flex items-center space-y-2 lg:space-y-0 lg:space-x-4 pl-[78px] lg:pl-0 whitespace-nowrap">
          <p>{{ $t('ticket.labels.timeStartDial') }}</p>
          <div>
            <CountDown class="w-full" :target="data.time" />
          </div>
        </div>
        <div class="w-px h-10 bg-[#D8D8D8] hidden lg:block"></div>
        <!-- 4 -->
        <div class="text-sm pl-[78px] lg:pl-0">
          <div class="mb-2 text-title-nodark">{{ $t('ticket.labels.status') }}:</div>
          <div :class="`font-bold ${statusClass}`">{{ statusTicket }}</div>
        </div>
      </div>
    </div>
    <LabelWinPrize v-if="data.win" class="absolute -top-1 -right-3.5" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TicketItem',
  components: {
    LabelWinPrize: () => import('@/components/ticket/LabelWinPrize.vue'),
    CountDown: () => import('@/components/datetime/CountDown.vue'),
    CircleItem: () => import('@/components/circle/CircleItem.vue'),
    Select: () => import('@/components/input/Select.vue'),
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      currency: 'tether',
    }
  },
  computed: {
    ...mapGetters({
      listCurrency: 'crypto/currency/getAvailableCurrencies',
      currentCurrency: 'pages/account/mywallet/currentCurrency',
    }),
    listCurrencyOptions() {
      return this.listCurrency.map((item) => ({
        title: item.name,
        value: item.id,
        symbol: item.symbol,
        icon: item.icon,
      }))
    },
    statusTicket() {
      switch (this.data.status) {
        case 1:
          return this.$t('ticket.labels.statusWait')
        case 2:
          return this.$t('ticket.labels.statusStartDial')
        case 3:
          return this.$t('ticket.labels.statusStartReward')
        case 4:
          return this.$t('ticket.labels.statusFinished')
      }
    },
    statusClass() {
      switch (this.data.status) {
        case 1:
          return 'text-yellow'
        case 2:
          return 'text-main'
        case 3:
          return 'text-[#FF228C]'
        case 4:
          return 'text-disable'
      }
    },
  },
}
</script>
