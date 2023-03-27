<template>
  <div class="pt-16 pb-4 lg:pb-14 container mx-auto">
    <div class="pt-6 flex flex-col space-y-6 lg:flex-row lg:space-x-6 lg:space-y-0">
      <div class="lg:w-2/3">
        <div class="rounded-lg shadow-default p-2 lg:p-4 dark:bg-block">
          <div class="font-bold text-[17px] lg:text-2xl text-title mb-2 lg:mb-4">
            {{ $t('ticket.labels.listTicket') }}
          </div>
          <div class="list-ticket space-y-4 relative">
            <TicketItemCart v-if="cartItems.length" v-for="(ticket, index) in cartItems" :key="`ticket-${index}`"
              :data="ticket" />
          </div>
        </div>
      </div>
      <div class="lg:w-1/3">
        <div class="rounded-lg shadow-default p-2 lg:p-4 dark:bg-block sticky top-20">
          <div class="flex items-center justify-between mb-2 lg:mb-4">
            <span class="font-bold text-[17px] lg:text-2xl text-title">{{ $t('cart.labels.checkout') }}</span>
            <CurrencyDropdown v-if="listCurrencyOptions && listCurrencyOptions.length > 0 && currencySelect"
              v-model="currencySelect" :currencies="listCurrencyOptions" @input="currencyDropdownOnValueChanged" />
          </div>
          <div class="title mb-2.5">{{ fullName }}</div>
          <div class="flex items-center justify-between mb-4">
            <span class="text-sm text-disable">{{ $t('cart.labels.accountBalance') }}:</span>
            <span class="font-bold text-[17px] text-title">{{ myBalanceWithSelectedCurrency | formatUSD(4) }}</span>
          </div>
          <div class="border border-default p-2 rounded-lg mb-4 text-sm">
            <table class="table-auto w-full">
              <thead class="text-left text-disable font-normal">
                <tr>
                  <th class="font-normal">{{ $t('cart.labels.product') }}</th>
                  <th class="font-normal">{{ $t('cart.labels.quantity') }}</th>
                  <th class="font-normal">{{ $t('cart.labels.price') }}</th>
                  <th class="font-normal text-right">{{ $t('cart.labels.total') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cartItemsGroupByLotteryProduct" :key="item.lotteryProductId"
                  class="py-2 border-b border-default last:border-none">
                  <td class="py-3">{{ item.lotteryProductVerboseName }}</td>
                  <td class="py-3">x{{ item.count }}</td>
                  <td class="py-3">{{ item.priceEstUsd | formatUSD(4) }}</td>
                  <td class="py-3 text-right">{{ (item.priceEstUsd * item.count) | formatUSD(4) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- Discount -->
          <div v-if="cartInfo.voucherCode" class="mb-4">
            <div class="flex items-center px-4 py-2 bg-[#FFF3E4] rounded text-sm saw-border -mx-1">
              <div class="mr-4"><svg-icon name="checkbox" class="w-4 h-4 text-main" /></div>
              <div class="flex-1 title-nodark">
                <div class="text-xs text-content mb-2">#Tên mã giảm giá</div>
                <div>Giảm <strong>5%</strong> khi mua <strong>5</strong> vé trở lên</div>
              </div>
              <div class="self-start text-[9px]">08/08/2022</div>
            </div>
          </div>
          <!-- Payment method -->
          <div class="mb-4">
            <div class="title mb-1 lg:mb-4">{{ $t('cart.labels.paymentMethod') }}</div>
            <div class="text-sm mb-2 text-disable">{{ $t('cart.labels.choosePaymentMethod') }}</div>
            <div class="flex flex-col space-y-2">
              <div v-for="method in listMethod" :key="method.id" class="rounded-lg border border-default py-3 px-4">
                <RadioBox :value="cartInfo.paymentMethod" :model-value="method.id"
                  @change="changePaymentMethod(method.id)">
                  <div class="ml-4 cursor-pointer flex items-center">
                    <div class="w-6 h-6 mr-2.5">
                      <img :src="method.icon" :alt="method.name" class="max-w-full h-auto" />
                    </div>
                    <div class="text-sm title-nodark">{{ method.name }}</div>
                  </div>
                </RadioBox>
              </div>
            </div>
            <div v-if="isInvalidPayment && verbosePaymentKind" class="flex items-center text-error text-xs mt-2 space-x-2">
              <svg-icon name="warnning" class="h-3 w-3" />
              <span>{{ verbosePaymentKind }}</span>
            </div>
          </div>
          <!-- Summary -->
          <div class="mb-4 bg-title-nodark rounded-lg py-6 px-4 overflow-hidden text-white text-sm">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>{{ $t('cart.labels.subtotal') }}:</div>
                <div class="font-bold">{{ cartInfo.total | formatUSD(4) }}</div>
              </div>
              <div class="flex items-center justify-between" v-if="cartInfo.discountAmount">
                <div>Giảm giá:</div>
                <div class="font-bold">5%</div>
              </div>
              <div class="flex items-center justify-between" v-if="cartInfo.paymentFeeEstUsd">
                <div>{{ $t('cart.labels.fee') }}:</div>
                <div class="font-bold">{{ cartInfo.paymentFeeEstUsd | formatUSD(4) }}</div>
              </div>
            </div>
            <div class="border-b border-dashed border-default relative my-6">
              <span class="rounded-full h-3 w-3 bg-white dark:bg-block absolute -left-4 -ml-1.5 -mt-1.5"></span>
              <span class="rounded-full h-3 w-3 bg-white dark:bg-block absolute -right-4 -mr-1.5 -mt-1.5"></span>
            </div>
            <div class="flex items-center justify-between font-bold">
              <div class="text-[17px]">{{ $t('cart.labels.total') }}:</div>
              <div class="text-2xl font-bold">{{ cartInfo.totalNetEstUsd | formatUSD(4) }}</div>
            </div>
          </div>
          <div>
            <BButton :isLoading="isLoading" :disabled="!isAllowCheckout" variant="primary" type="text"
              class="w-full rounded-lg">
              {{ $t('cart.labels.checkoutNow') }}
            </BButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  layout: 'app',
  auth: false,
  name: 'PageCart',
  components: {
    TicketItemCart: () => import('@/components/ticket/TicketItemCart.vue'),
    RadioBox: () => import('@/components/input/RadioBox.vue'),
    BButton: () => import('@/components/button/BButton.vue'),
    CurrencyDropdown: () => import('@/components/dropdown/CurrencyDropdown.vue'),
  },
  data() {
    return {
      currencySelect: null,
    }
  },
  computed: {
    ...mapGetters({
      listCurrency: 'crypto/currency/getCurrenciesAllowPayment',
      cartInfo: 'user/cart/cartInfo',
      cartItems: 'user/cart/cartItems',
      isLoading: 'user/cart/isLoading',
      isAllowCheckout: 'user/cart/isAllowCheckout',
      cartItemsGroupByLotteryProduct: 'user/cart/cartItemsGroupByLotteryProduct',
      isInvalidPayment: 'user/cart/isInvalidPayment',
      paymentKind: 'user/cart/paymentKind',
      userInfo: 'loggedInUser',
      userAsset: 'user/asset/userAsset',
      userAssetAllBalance: 'user/asset/userAssetsGroupByCurrency',
      listMethod: 'crypto/payments/listMethod',
    }),
    fullName() {
      return `${this.userInfo.firstName} ${this.userInfo.lastName}`
    },
    myTotalBalanceEstUsd() {
      let balance = 0
      if (this.userAsset && this.userAsset.totalBalanceEstUsd != 0) {
        balance = this.userAsset.totalBalanceEstUsd
      }
      return balance
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
     * Payment status message
     */
    verbosePaymentKind() {
      const msgs = {
        "invalid_balance": this.$t("payment.message.invalidBalance"),
        "invalid_payment_gateway": this.$t("payment.message.invalidMethod"),
        "invalid_currency": this.$t("payment.message.invalidCurrency"),
      }
      return msgs[this.paymentKind]
    }
  },
  mounted() {
    this.getListCurrency().then(() => {
      this.getCart().then(() => {
        this.currencySelect = this.cartInfo.currency
      })
    })
    this.getMethods()
    this.getUserAsset()
  },
  methods: {
    ...mapActions({
      getListCurrency: 'crypto/currency/getCurrencies',
      getCart: 'user/cart/getCart',
      changeCurrency: 'user/cart/changeCurrency',
      changePaymentMethod: 'user/cart/changePaymentMethod',
      getMethods: 'crypto/payments/getMethods',
      getUserAsset: 'user/asset/getUserAsset',
    }),
    currencyDropdownOnValueChanged() {
      if (this.currencySelected) {
        this.changeCurrency(this.currencySelected.symbol)
      }
    },
  },
}
</script>

<style scoped>
.saw-border {
  background-image: linear-gradient(135deg, #fff 50%, transparent 50%),
    linear-gradient(45deg, #fff 50%, transparent 50%), linear-gradient(-135deg, #fff 50%, transparent 50%),
    linear-gradient(-45deg, #fff 50%, transparent 50%);
  background-position: top left, top left, top right, top right;
  background-size: 8px 8px;
  background-repeat: repeat-y;
}
</style>
