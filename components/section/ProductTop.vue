<template>
  <section
    v-if="productInfo"
    class="
      relative
      overflow-hidden
      section-welcome
      bg-cover bg-no-repeat bg-center bg-[url('~/static/banner/bg-product-top.png')]
      pt-20
    "
  >
    <div class="container mx-auto relative z-10 h-full flex items-end justify-center pb-10">
      <div
        class="
          product-info
          relative
          flex flex-col
          lg:flex-row lg:flex-wrap
          max-w-full
          bg-cover bg-no-repeat bg-top
          rounded-xl
        "
        :class="
          showAssets
            ? `extra bg-[url('~/static/banner/bg-product-info-extra.png')]`
            : `bg-[url('~/static/banner/bg-product-info.png')]`
        "
      >
        <div class="producttop__info relative pt-5 pb-6 min-w-[345px] text-center text-white leading-tight">
          <p class="text-lg mb-1 leading-tight">Lottery Jackpot</p>
          <div class="text-[40px] font-bold text-main mb-1.5 tracking-[0.02em]">{{ jackpotEstimatedValue }}</div>
          <div class="flex justify-center mb-3">
            <CountDown class="!text-white" v-if="productInfo.nextSessionDrawDatetime" :target="nextDrawDatetime" />
          </div>
          <div class="space-x-2">
            <BButton
              v-if="listAssets"
              variant="warning"
              class="rounded text-white"
              @click="() => showAssetsHandleClick()"
            >
              <svg-icon v-show="isLoading" name="loader" class="w-4 h-4 animate-spin" />
              Assets
            </BButton>
            <BButton
              variant="primary"
              class="rounded text-white"
              @click="
                $modal.show('find-number', {
                  maxValuePerItem: productInfo.maxValuePerItem,
                  numberOfItems: productInfo.numberOfItems,
                  lotteryProductId: productInfo.id,
                  lotterySessionId: productInfo.nextSessionId,
                })
              "
              >{{ $t('ticket.labels.buyTicket', { price: usdPricePerTicket }) }}</BButton
            >
          </div>
          <img
            src="~/static/bg/coin-productinfo-small.svg"
            alt="coin-productinfo-small"
            class="absolute -left-[20px] bottom-[15px]"
          />
          <img
            src="~/static/bg/coin-productinfo-big.svg"
            alt="coin-productinfo-big"
            class="absolute -right-[30px] top-[15px]"
          />
        </div>
        <div
          v-if="showAssets && listAssets"
          class="
            producttop__assets
            bg-cover bg-no-repeat bg-center
            lg:bg-[url('~/static/banner/bg-product-assets.svg')]
            leading-tight
            text-white
            px-3
            lg:-ml-3 lg:max-w-[420px] lg:pl-7 lg:pr-8
            py-4
          "
        >
          <div class="font-bold text-[17px]">Jackpot</div>
          <div
            v-for="item in listAssets"
            :key="item.id"
            class="flex items-center justify-between space-x-6 py-2 border-b border-dashed border-line"
          >
            <div class="capitalize min-w-[100px] flex items-center space-x-2">
              <div class="w-6 h-6 overflow-hidden rounded-full">
                <img class="max-w-full h-auto" :src="getImageNetwork(item.id)" alt="item.network" />
              </div>
              <span>{{ item.symbol }}</span>
            </div>
            <div class="text-yellow">{{ item.balance }} {{ item.symbol }}</div>
            <a :href="getAssetAddressLink(item)" target="_blank" class="truncate flex-1">{{ item.address }}</a>
          </div>
        </div>
      </div>
    </div>
    <img
      src="~/static/bg/coin-product-left.png"
      alt="coin-product-left"
      class="absolute left-0 bottom-0 w-[150px] lg:w-auto"
    />
    <img
      src="~/static/bg/coin-product-right.png"
      alt="coin-product-right"
      class="absolute right-0 bottom-0 w-[170px] lg:w-auto"
    />
  </section>
</template>
<script>
import { toDateTime } from '@/utils/datetime'
import { formatUSD } from '@/utils/currency'
import { mapGetters, mapActions } from 'vuex'
import { isEmpty, isNull } from 'lodash'
export default {
  name: 'ProductTop',
  components: {
    BButton: () => import('@/components/button/BButton.vue'),
    CountDown: () => import('@/components/datetime/CountDown.vue'),
  },
  props: {
    productInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      showAssets: false,
      listAssets: [],
      isLoaded: false,
      isLoading: false,
    }
  },
  computed: {
    ...mapGetters({
      allNetworks: 'crypto/network/getAllNetworks',
      lotteryAssetAccounts: 'lottery/asset/lotteryAssetAccounts',
    }),
    nextDrawDatetime() {
      return toDateTime(this.productInfo.nextSessionDrawDatetime)
    },
    jackpotEstimatedValue() {
      const jackpot = this.productInfo.nextSessionEstimatedJackpot || 0
      return formatUSD(jackpot)
    },
    usdPricePerTicket() {
      const price = this.productInfo.usdPricePerTicket || 0
      return formatUSD(price, 2)
    },
  },
  methods: {
    ...mapActions({
      getNetworks: 'crypto/network/getNetworks',
      getLotteryAsset: 'lottery/asset/getLotteryAsset',
    }),
    getImageNetwork(id) {
      return (this.allNetworks.find((item) => item.id === id) || {}).icon
    },
    async showAssetsHandleClick() {
      this.listAssets = []
      this.isLoading = true
      try {
        if (!this.isLoaded) {
          await Promise.all([
            this.getNetworks(),
            this.getLotteryAsset({
              lotteryProductId: this.productInfo.id,
              lotterySessionId: this.productInfo.nextSessionId,
              includeBalance: true,
            }),
          ])
        }
        if (!isEmpty(this.allNetworks) && !isNull(this.lotteryAssetAccounts)) {
          for (const account of Object.keys(this.lotteryAssetAccounts)) {
            this.listAssets.push({
              id: account,
              symbol: this.lotteryAssetAccounts[account].currency,
              address: this.lotteryAssetAccounts[account].address,
              balance: this.lotteryAssetAccounts[account].balanceEstUsd,
            })
          }
          this.isLoaded = true
        }
      } catch (error) {
        console.log(error)
      }
      this.showAssets = !this.showAssets
      this.isLoading = false
    },
    getAssetAddressLink(asset) {
      let link = '#'
      let network = this.allNetworks.find((network) => network.id === asset.id)
      if (network && network.explorerAddressUrl) {
        link = network.explorerAddressUrl.replace('{address}', asset.address)
      }
      return link
    },
  },
}
</script>

<style lang="scss" scoped>
.product-info::before,
.product-info::after {
  content: '';
  position: absolute;
  z-index: 1;
  width: calc(100% - 12px);
  height: 1px;
  left: 6px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #ffffff 56%, rgba(255, 255, 255, 0) 100%);
}
.product-info::before {
  top: 0;
}
.product-info::after {
  bottom: 0;
}
</style>
