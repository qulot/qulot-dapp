<template>
  <div class="pt-16 pb-4 lg:pb-14 container mx-auto">
    <div
      class="pt-6 flex flex-col space-y-6 lg:flex-row lg:space-x-6 lg:space-y-0"
    >
      <div class="lg:w-2/3">
        <div class="rounded-lg shadow-default p-2 lg:p-4 dark:bg-block">
          <div
            class="font-bold text-[17px] lg:text-2xl text-title mb-2 lg:mb-4"
          >
            {{ $t('ticket.listTicket') }}
          </div>
          <div
            v-if="token && tickets.length"
            class="list-ticket space-y-4 relative"
          >
            <CartTicketItem
              v-for="ticket in tickets"
              :key="ticket.id"
              :currency="token.symbol"
              :pick-numbers="ticket.pickNumbers"
              :selected="ticket.selected"
              :price-per-ticket="
                formatEther(
                  lotteryAsKeys[ticket.lotteryId]?.pricePerTicket || '0'
                )
              "
              :lottery-picture="lotteryAsKeys[ticket.lotteryId]?.picture"
              :lottery-verbose-name="
                lotteryAsKeys[ticket.lotteryId]?.verboseName
              "
            />
          </div>
        </div>
      </div>
      <div class="lg:w-1/3">
        <div
          class="rounded-lg shadow-default p-2 lg:p-4 dark:bg-block sticky top-20"
        >
          <div class="flex items-center justify-between mb-2 lg:mb-4">
            <span class="font-bold text-[17px] lg:text-2xl text-title">{{
              $t('cart.checkout')
            }}</span>
          </div>
          <!-- <div class="title mb-2.5">{{ fullName }}</div> -->
          <div class="flex items-center justify-between mb-4">
            <span class="text-sm text-disable">
              {{ $t('cart.accountBalance') }}:
            </span>
            <span
              v-if="token && tokenBalance"
              class="font-bold text-[17px] text-title"
            >
              {{ tokenBalance.formatted }}
              {{ token.symbol }}
            </span>
          </div>
          <div class="border border-default p-2 rounded-lg mb-4 text-sm">
            <table class="table-auto w-full">
              <thead class="text-left text-disable font-normal">
                <tr>
                  <th class="font-normal">{{ $t('cart.product') }}</th>
                  <th class="font-normal">{{ $t('cart.quantity') }}</th>
                  <th class="font-normal">{{ $t('cart.price') }}</th>
                  <th class="font-normal text-right">
                    {{ $t('cart.total') }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <!-- <tr
                  v-for="(item, index) in ticketsGroupByLotteryId"
                  :key="index"
                  class="py-2 border-b border-default last:border-none"
                >
                  <td class="py-3">{{ item.lotteryProductVerboseName }}</td>
                  <td class="py-3">x{{ item.length }}</td>
                  <td class="py-3">{{ item.priceEstUsd }}</td>
                  <td class="py-3 text-right">
                    {{ item.priceEstUsd * item.count }}
                  </td>
                </tr> -->
              </tbody>
            </table>
          </div>
          <!-- Payment method -->
          <div class="mb-4">
            <div class="title mb-1 lg:mb-4">
              {{ $t('cart.paymentMethod') }}
            </div>
            <div class="text-sm mb-2 text-disable">
              {{ $t('cart.choosePaymentMethod') }}
            </div>
            <!-- <div class="flex flex-col space-y-2">
              <div
                v-for="method in listMethod"
                :key="method.id"
                class="rounded-lg border border-default py-3 px-4"
              >
                <RadioBox
                  :value="cartInfo.paymentMethod"
                  :model-value="method.id"
                  @change="changePaymentMethod(method.id)"
                >
                  <div class="ml-4 cursor-pointer flex items-center">
                    <div class="w-6 h-6 mr-2.5">
                      <img
                        :src="method.icon"
                        :alt="method.name"
                        class="max-w-full h-auto"
                      />
                    </div>
                    <div class="text-sm title-nodark">{{ method.name }}</div>
                  </div>
                </RadioBox>
              </div>
            </div> -->
            <!-- <div
              v-if="isInvalidPayment && verbosePaymentKind"
              class="flex items-center text-error text-xs mt-2 space-x-2"
            >
              <SvgIcon name="warnning" class="h-3 w-3" />
              <span>{{ verbosePaymentKind }}</span>
            </div> -->
          </div>
          <!-- Summary -->
          <div
            class="mb-4 bg-title-nodark rounded-lg py-6 px-4 overflow-hidden text-white text-sm"
          >
            <!-- <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>{{ $t('cart.labels.subtotal') }}:</div>
                <div class="font-bold">{{ cartInfo.total | formatUSD(4) }}</div>
              </div>
              <div
                v-if="cartInfo.discountAmount"
                class="flex items-center justify-between"
              >
                <div>Giảm giá:</div>
                <div class="font-bold">5%</div>
              </div>
              <div
                v-if="cartInfo.paymentFeeEstUsd"
                class="flex items-center justify-between"
              >
                <div>{{ $t('cart.labels.fee') }}:</div>
                <div class="font-bold">
                  {{ cartInfo.paymentFeeEstUsd | formatUSD(4) }}
                </div>
              </div>
            </div> -->
            <div class="border-b border-dashed border-default relative my-6">
              <span
                class="rounded-full h-3 w-3 bg-white dark:bg-block absolute -left-4 -ml-1.5 -mt-1.5"
              ></span>
              <span
                class="rounded-full h-3 w-3 bg-white dark:bg-block absolute -right-4 -mr-1.5 -mt-1.5"
              ></span>
            </div>
            <div class="flex items-center justify-between font-bold">
              <div class="text-[17px]">{{ $t('cart.labels.total') }}:</div>
              <!-- <div class="text-2xl font-bold">
                {{ cartInfo.totalNetEstUsd | formatUSD(4) }}
              </div> -->
            </div>
          </div>
          <div>
            <Button variant="primary" type="button" class="w-full rounded-lg">
              {{ $t('cart.labels.checkoutNow') }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatEther } from 'ethers/lib/utils.js'
import { storeToRefs } from 'pinia'
const { token } = useQulot()
const { tokenBalance } = useAccount()
const cartStore = useCartStore()
const lotteryStore = useLotteryStore()
const { lotteryAsKeys } = storeToRefs(lotteryStore)
const { tickets, ticketsGroupByLotteryId } = storeToRefs(cartStore)

const format = () => {}
</script>

<style scoped>
.saw-border {
  background-image: linear-gradient(135deg, #fff 50%, transparent 50%),
    linear-gradient(45deg, #fff 50%, transparent 50%),
    linear-gradient(-135deg, #fff 50%, transparent 50%),
    linear-gradient(-45deg, #fff 50%, transparent 50%);
  background-position: top left, top left, top right, top right;
  background-size: 8px 8px;
  background-repeat: repeat-y;
}
</style>
