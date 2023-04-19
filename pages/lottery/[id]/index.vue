<template>
  <div class="relative pb-4 lg:pb-14">
    <LotteryCountDownCard v-if="lottery" :lottery="lottery" />
    <LotteryNextRoundSession v-if="lottery" :lottery="lottery" />
    <div class="container mx-auto">
      <div
        class="pt-4 lg:pt-6 flex flex-col space-y-4 lg:flex-row lg:space-x-6 lg:space-y-0"
      >
        <div class="lg:w-5/12">
          <div class="sticky top-20 space-y-4 lg:space-y-6">
            <div class="rounded-lg bg-[#7230C0]">
              <div
                class="bg-[#8B5CFF] rounded-t-lg px-4 py-3.5 flex items-center justify-between"
              >
                <h2 class="text-[17px] font-bold text-white">
                  {{ $t('wallet.labels.myWallet') }}
                </h2>
              </div>
              <div class="p-2 lg:p-4 grid grid-cols-2 gap-2 lg:gap-4">
                <ItemWallet
                  :title="$t('cart.labels.myBalance')"
                  :value-wallet="10"
                />
                <ItemWallet
                  :title="$t('cart.labels.pricePerTicket')"
                  :value-wallet="10"
                />
              </div>
            </div>
            <div
              id="order"
              class="bg-white dark:bg-block shadow-default rounded-lg"
            >
              <div
                class="bg-[#6135E9] rounded-t-lg px-4 py-3.5 flex items-center justify-between"
              >
                <h2 class="text-[17px] font-bold text-white">
                  {{ $t('cart.labels.order') }}
                </h2>
                <div
                  class="space-x-2 lg:space-x-4 flex items-center text-sm text-disable"
                >
                  <div class="space-x-1 lg:space-x-2">
                    <span>{{ $t('cart.labels.selected') }}:</span
                    ><span class="font-bold text-yellow">{{
                      $t('cart.labels.selectedValue', {
                        value: 10,
                      })
                    }}</span>
                  </div>
                  <span class="w-px h-3 bg-white"></span>
                  <div class="space-x-1 lg:space-x-2">
                    <span>{{ $t('cart.labels.total') }}:</span
                    ><span class="font-bold text-yellow">{{ 0 }}</span>
                  </div>
                </div>
              </div>
              <!-- <div
                v-if="listTicket && listTicket.length > 0"
                class="tickets p-2 space-y-2"
              >
                <CartTicketItem
                  v-for="(item, index) in listTicket"
                  :key="`item-cart-${index}`"
                  :data-item="item"
                  :currency-selected="currencySelected"
                  :price-ticket="pricePerTicketWithSelectedCurrency"
                />
              </div>
              <div v-else class="p-2 pt-6 text-center">
                {{ $t('ticket.labels.empty') }}
              </div> -->
              <div
                class="w-full flex flex-wrap xl:flex-row xl:items-center xl:justify-around p-4"
              >
                <Button
                  class="rounded border-title text-title bg-transparent hover:text-main hover:bg-transparent hover:border-main mr-4"
                >
                  {{ $t('product.labels.addTicket') }}
                </Button>
                <Button
                  class="rounded border-title text-title bg-transparent hover:text-main hover:bg-transparent hover:border-main flex-1 xl:mr-4"
                >
                  {{ $t('product.labels.selectRandom', { number: 3 }) }}
                </Button>
                <Button
                  variant="primary"
                  class="rounded text-white w-full mt-3 xl:w-auto xl:mt-0"
                  >{{ $t('product.labels.orderNow') }}</Button
                >
              </div>
            </div>
          </div>
        </div>
        <client-only>
          <div class="lg:w-7/12">
            <!-- <InfiniteScrollSession :product="product" /> -->
          </div>
        </client-only>
      </div>
    </div>
    <FindNumber />
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'

definePageMeta({
  validate: (route) => {
    return !containsSpecialChars(route.params.id as string)
  },
})

const route = useRoute()

const lotteryStore = useLotteryStore()
const { isExists, lottery } = storeToRefs(lotteryStore)

await lotteryStore.fetchLotteryById(route.params.id as string)

if (!isExists.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
  })
}
</script>
