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
      :class="'before:border-white after:border-white'"
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
        :class="'border-[#F3EFFF]'"
      >
        <!-- 1 -->
        <div class="flex items-center lg:w-1/2">
          <div class="w-[70px] h-[70px] rounded overflow-hidden mr-2 lg:mr-4 flex items-center">
            <img class="inset-0" :src="data.lotteryProductPicture" alt="thumbnail" />
          </div>
          <div>
            <div class="text-[17px] font-bold text-title-nodark leading-tight mb-3">
              {{ data.lotteryProductVerboseName }}
            </div>
            <div class="flex items-center space-x-2">
              <div v-for="(num, i) in data.pickNumbers" :key="i">
                <CircleItem :number="num" />
              </div>
            </div>
          </div>
        </div>
        <div class="w-px h-10 bg-[#D8D8D8] hidden lg:block"></div>
        <!-- 2 -->
        <div class="pl-[78px] lg:pl-0 flex items-center flex-1 justify-between">
          <div class="flex items-center space-x-1 leading-tight">
            <div class="w-4 h-4 overflow-hidden rounded-full">
              <img class="max-w-full h-auto" :src="data.currencyIcon" :alt="data.currency" />
            </div>
            <span class="text-xs">{{ data.price | formatMoney(4, data.currency) }}</span>
            <span class="text-[17px] font-bold text-title-nodark">{{ data.priceEstUsd | formatUSD(4) }}</span>
          </div>
          <div
            class="
              absolute
              lg:relative
              top-4
              right-3
              lg:top-auto lg:right-auto
              flex
              items-center
              space-x-5
              lg:space-x-7
            "
          >
            <div @click="handleDelete(data.id)" class="cursor-pointer hover:text-error">
              {{ $t('cart.labels.deleteTicket') }}
            </div>
            <div @click="handleCheck" class="cursor-pointer">
              <svg-icon :name="data.isChecked ? 'checkbox' : 'uncheck'" class="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TicketItemCart',
  components: {
    CircleItem: () => import('@/components/circle/CircleItem.vue'),
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
      products: 'lottery/product/getAvailableProducts',
    }),
    listCurrencyOptions() {
      return this.listCurrency.map((item) => ({
        title: item.name,
        value: item.id,
        symbol: item.symbol,
        icon: item.icon,
      }))
    },
  },
  methods: {
    handleDelete(id) {
      this.$store.dispatch('user/cart/deleteCart', [id])
    },
    handleCheck() {
      const params = {
        id: this.data.id,
        data: {
          pickNumbers: this.data.pickNumbers,
          isChecked: !this.data.isChecked,
        },
      }
      this.$store.dispatch('user/cart/updateCartItem', params)
    },
  },
}
</script>
