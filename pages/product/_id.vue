<template>
  <div class="relative pb-4 lg:pb-14">
    <ProductTop :productInfo="product" />
    <ProductNextSession :session="nextSession" />
    <div class="container mx-auto">
      <div class="pt-4 lg:pt-6 flex flex-col space-y-4 lg:flex-row lg:space-x-6 lg:space-y-0">
        <div class="lg:w-5/12">
          <div class="sticky top-20 space-y-4 lg:space-y-6">
            <div class="rounded-lg bg-[#7230C0]">
              <div class="bg-[#8B5CFF] rounded-t-lg px-4 py-3.5 flex items-center justify-between">
                <h2 class="text-[17px] font-bold text-white">
                  {{ $t('wallet.labels.myWallet') }}
                </h2>
                <CurrencyDropdown
                  v-if="listCurrencyOptions && listCurrencyOptions.length > 0 && currencySelect"
                  v-model="currencySelect"
                  :currencies="listCurrencyOptions"
                  @input="currencyDropdownOnValueChanged"
                  class-label="text-white -ml-2"
                />
              </div>
              <div class="p-2 lg:p-4 grid grid-cols-2 gap-2 lg:gap-4">
                <ItemWallet
                  :title="$t('cart.labels.myBalance')"
                  :value-wallet="myBalanceWithSelectedCurrency | formatMoney(4, currencySelect)"
                />
                <ItemWallet
                  :title="$t('cart.labels.pricePerTicket')"
                  :value-wallet="pricePerTicketWithSelectedCurrency | formatMoney(4, currencySelect)"
                />
              </div>
            </div>
            <div id="order" class="bg-white dark:bg-block shadow-default rounded-lg">
              <div class="bg-[#6135E9] rounded-t-lg px-4 py-3.5 flex items-center justify-between">
                <h2 class="text-[17px] font-bold text-white">{{ $t('cart.labels.order') }}</h2>
                <div class="space-x-2 lg:space-x-4 flex items-center text-sm text-disable">
                  <div class="space-x-1 lg:space-x-2">
                    <span>{{ $t('cart.labels.selected') }}:</span
                    ><span class="font-bold text-yellow">{{
                      $t('cart.labels.selectedValue', { value: listTicket.length })
                    }}</span>
                  </div>
                  <span class="w-px h-3 bg-white"></span>
                  <div class="space-x-1 lg:space-x-2">
                    <span>{{ $t('cart.labels.total') }}:</span
                    ><span class="font-bold text-yellow">{{ totalPriceTicket | formatMoney(4, currencySelect) }}</span>
                  </div>
                </div>
              </div>
              <div v-if="listTicket && listTicket.length > 0" class="tickets p-2 space-y-2">
                <CartTicketItem
                  v-for="(item, index) in listTicket"
                  :key="`item-cart-${index}`"
                  :data-item="item"
                  :currencySelected="currencySelected"
                  :price-ticket="pricePerTicketWithSelectedCurrency"
                />
              </div>
              <div v-else class="p-2 pt-6 text-center">{{ $t('ticket.labels.empty') }}</div>
              <div class="w-full flex flex-wrap xl:flex-row xl:items-center xl:justify-around p-4">
                <BButton
                  class="
                    rounded
                    border-title
                    text-title
                    bg-transparent
                    hover:text-main hover:bg-transparent hover:border-main
                    mr-4
                  "
                  @click="
                    $modal.show('find-number', {
                      maxValuePerItem: product.maxValuePerItem,
                      numberOfItems: product.numberOfItems,
                      lotteryProductId: product.id,
                      lotterySessionId: product.nextSessionId,
                    })
                  "
                >
                  {{ $t('product.labels.addTicket') }}
                </BButton>
                <BButton
                  class="
                    rounded
                    border-title
                    text-title
                    bg-transparent
                    hover:text-main hover:bg-transparent hover:border-main
                    flex-1
                    xl:mr-4
                  "
                  @click="handleAddRandomNumbersToCart"
                >
                  {{ $t('product.labels.selectRandom', { number: randomTickets }) }}
                </BButton>
                <BButton
                  variant="primary"
                  class="rounded text-white w-full mt-3 xl:w-auto xl:mt-0"
                  @click="handleAddToCart"
                  :disabled="!isAllowAddToCart"
                  >{{ $t('product.labels.orderNow') }}</BButton
                >
              </div>
            </div>
          </div>
        </div>
        <client-only>
          <div class="lg:w-7/12">
            <InfiniteScrollSession :product="product" />
          </div>
        </client-only>
      </div>
    </div>
    <FindNumber />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { isNotFoundError } from '@/utils/http'
import { bulkRandomRange, formatMoney } from '@/utils/number'
import { StatusCodes } from 'http-status-codes'

export default {
  layout: 'app',
  name: 'ProductDetail',
  components: {
    ProductTop: () => import('@/components/section/ProductTop.vue'),
    ProductNextSession: () => import('@/components/section/ProductNextSession.vue'),
    ItemWallet: () => import('@/components/card/ItemWallet.vue'),
    BButton: () => import('@/components/button/BButton.vue'),
    CartTicketItem: () => import('@/components/ticket/CartTicketItem.vue'),
    FindNumber: () => import('@/components/modal/FindNumber.vue'),
    InfiniteScrollSession: () => import('@/components/session/InfiniteScrollSession.vue'),
    CurrencyDropdown: () => import('@/components/dropdown/CurrencyDropdown.vue'),
  },
  async fetch({ params, error, store, app }) {
    try {
      await store.dispatch('lottery/product/getProduct', params.id)
    } catch (err) {
      if (isNotFoundError(err)) {
        error({
          statusCode: StatusCodes.NOT_FOUND,
          message: app.i18n.t('message.pageYouLookingNotFound') + '. ' + app.i18n.t('message.plsTryAgain'),
        })
        return
      }
      error({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: app.i18n.t('message.unknownError') + '. ' + app.i18n.t('message.plsTryAgain'),
      })
    }
  },
  data() {
    return {
      currencySelect: null,
      randomTickets: 3,
    }
  },
  computed: {
    ...mapGetters({
      listCurrency: 'crypto/currency/getCurrenciesAllowPayment',
      tickets: 'lottery/ticket/tickets',
      cartInfo: 'user/cart/cartInfo',
      userAssetAllBalance: 'user/asset/userAssetsGroupByCurrency',
      product: 'lottery/product/getProduct',
      lotteryAsset: 'lottery/product/getProduct',
    }),
    listTicket() {
      return this.tickets.filter((item) => item.lotteryProductId === this.product.id) || []
    },
    isAllowAddToCart() {
      return this.listTicket.some((ticket) => ticket.isChecked)
    },
    listCurrencyOptions() {
      return this.listCurrency.map((item) => ({
        title: item.symbol,
        value: item.symbol,
        icon: item.icon,
      }))
    },
    currencySelected() {
      return this.listCurrency.find((item) => item.symbol === this.currencySelect)
    },
    nextSession() {
      return {
        nextSessionId: this.product.nextSessionId,
        picture: this.product.picture,
        nextSessionDrawDatetime: this.product.nextSessionDrawDatetime,
        nextSessionEstimatedJackpot: this.product.nextSessionEstimatedJackpot,
      }
    },
    /**
     * Return user balance with current selected currency
     */
    myBalanceWithSelectedCurrency() {
      let balance = 0

      if (
        this.userAssetAllBalance != null &&
        this.currencySelected != null &&
        Object.hasOwnProperty.call(this.userAssetAllBalance, this.currencySelected.symbol)
      ) {
        balance = this.userAssetAllBalance[this.currencySelected.symbol].balance
      }

      return balance
    },
    /**
     * Return price ticket with current selected currency
     */
    pricePerTicketWithSelectedCurrency() {
      let currencyUsdPrice = 0,
        usdPricePerTicket = 0
      if (this.currencySelected != null) {
        currencyUsdPrice = this.currencySelected.priceUsd
      }
      if (this.product != null) {
        usdPricePerTicket = this.product.usdPricePerTicket
      }
      return usdPricePerTicket / currencyUsdPrice
    },
    /**
     * Return total price
     */
    totalPriceTicket() {
      return this.listTicket.length * this.pricePerTicketWithSelectedCurrency
    },
  },
  mounted() {
    this.getListCurrency().then(() => {
      this.getCart().then(() => {
        this.currencySelect = this.cartInfo.currency
      })
    })
    this.getUserAsset()
  },
  methods: {
    ...mapActions({
      getListCurrency: 'crypto/currency/getCurrencies',
      getCart: 'user/cart/getCart',
      addCart: 'user/cart/addCart',
      changeCurrency: 'user/cart/changeCurrency',
      getUserAsset: 'user/asset/getUserAsset',
    }),
    async handleAddToCart() {
      const items = this.listTicket.filter((item) => item.isChecked === true) || null
      if (items) {
        await this.addCart(items)
        items.forEach((item) => this.$store.commit('lottery/ticket/DELETE_TICKET', item))
        this.$router.push('/cart')
      }
    },
    currencyDropdownOnValueChanged() {
      if (this.currencySelected) {
        this.changeCurrency(this.currencySelected.symbol)
      }
    },
    handleAddRandomNumbersToCart() {
      for (let index = 0; index < this.randomTickets; index++) {
        let pickNumbers = bulkRandomRange(
          this.product.numberOfItems,
          this.product.minValuePerItem,
          this.product.maxValuePerItem
        )
        this.$store.commit('lottery/ticket/ADD_TICKET', {
          lotteryProductId: this.product.id,
          lotterySessionId: this.product.nextSessionId,
          pickNumbers: pickNumbers,
          isChecked: true,
        })
      }
    },
  },
}
</script>
