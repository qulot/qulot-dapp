<template>
  <div class="relative pb-4 lg:pb-14">
    <LotteryCountDownCard
      v-if="lottery"
      :lottery="lottery"
      @buy-ticket="showPickNumberModal = true"
    />
    <LotteryNextRoundSession v-if="lottery" :lottery="lottery" />
    <div class="container mx-auto">
      <div
        class="pt-4 lg:pt-6 flex flex-col space-y-4 lg:flex-row lg:space-x-6 lg:space-y-0"
      >
        <div class="lg:w-5/12">
          <div class="sticky top-20 space-y-4 lg:space-y-6">
            <LotteryMyWalletCompare />
            <div
              id="order"
              class="bg-white dark:bg-block shadow-default rounded-lg"
            >
              <div
                class="bg-[#6135E9] rounded-t-lg px-4 py-3.5 flex items-center justify-between"
              >
                <h2 class="text-[17px] font-bold text-white">
                  {{ $t('cart.order') }}
                </h2>
                <div
                  class="space-x-2 lg:space-x-4 flex items-center text-sm text-disable"
                >
                  <div class="space-x-1 lg:space-x-2">
                    <span>{{ $t('cart.selected') }}:</span
                    ><span class="font-bold text-yellow">{{
                      $t('cart.selectedValue', {
                        value: tickets.length,
                      })
                    }}</span>
                  </div>
                  <span class="w-px h-3 bg-white"></span>
                  <div class="space-x-1 lg:space-x-2">
                    <span>{{ $t('cart.total') }}:</span
                    ><span class="font-bold text-yellow">{{ totalPrice }}</span>
                  </div>
                </div>
              </div>
              <div
                v-if="tickets && tickets.length && token && lottery"
                class="tickets p-2 space-y-2"
              >
                <LotteryTicketItem
                  v-for="item in tickets"
                  :key="item.id"
                  :pick-numbers="item.pickNumbers"
                  :currency="token.symbol"
                  :selected="item.selected"
                  :price-per-ticket="lottery.pricePerTicket"
                  @select="toggleSelectTicket(item.id)"
                  @delete="removeTicket(item.id)"
                />
              </div>
              <div v-else class="p-2 pt-6 text-center">
                {{ $t('ticket.empty') }}
              </div>
              <div
                class="w-full flex flex-wrap xl:flex-row xl:items-center xl:justify-around p-4"
              >
                <Button
                  class="rounded border-title text-title bg-transparent hover:text-main hover:bg-transparent hover:border-main mr-4"
                  @click="showPickNumberModal = true"
                >
                  {{ $t('cart.addTicket') }}
                </Button>
                <Button
                  class="rounded border-title text-title bg-transparent hover:text-main hover:bg-transparent hover:border-main flex-1 xl:mr-4"
                  @click="randomTickets"
                >
                  {{ $t('cart.selectRandom', { number: randomTicketsNumber }) }}
                </Button>
                <Button
                  variant="primary"
                  class="rounded text-white w-full mt-3 xl:w-auto xl:mt-0"
                  :disabled="tickets.length === 0"
                  @click="buyNow"
                  >{{ $t('cart.buyNow') }}</Button
                >
              </div>
            </div>
          </div>
        </div>
        <div class="lg:w-7/12">
          <ClientOnly>
            <RoundListPerLottery v-if="lottery" :lottery="lottery" />
          </ClientOnly>
        </div>
      </div>
    </div>
    <ModalPickNumber
      v-if="lottery"
      v-model:show="showPickNumberModal"
      :number-of-items="lottery?.numberOfItems"
      :min-value-per-item="lottery?.minValuePerItem"
      :max-value-per-item="lottery?.maxValuePerItem"
      @confirm="pickNumberOnConfirm"
    />
  </div>
</template>
<script setup lang="ts">
import { formatEther } from '@ethersproject/units'
import { BigNumber } from 'ethers'
import { storeToRefs } from 'pinia'
import { CartTicket } from '~~/types/ticket'

definePageMeta({
  validate: (route) => {
    return !containsSpecialChars(route.params.id as string)
  },
})

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const { token } = useQulot()
const lotteryStore = useLotteryStore()
const cartStore = useCartStore()
const { isExists, lottery } = storeToRefs(lotteryStore)

definePageMeta({
  layout: 'app',
})

await lotteryStore.fetchLotteryById(route.params.id as string)

if (!isExists.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
  })
}

const title = computed(
  () => `${lottery.value?.verboseName} | ${config.public.metadata.appName}`
)

useSeoMeta({
  title,
  ogTitle: title,
  ogImage: lottery.value?.picture,
  twitterCard: 'app',
})

const showPickNumberModal = ref(false)
const randomTicketsNumber = ref(3)
const tickets = ref<CartTicket[]>([])

const totalPrice = computed(() => {
  let totalPrice = '0'
  if (lottery.value?.pricePerTicket && tickets.value.length) {
    totalPrice = formatEther(
      BigNumber.from(lottery.value?.pricePerTicket).mul(tickets.value.length)
    )
  }
  return totalPrice
})

const pickNumberOnConfirm = (pickNumbers: number[]) => {
  if (lottery.value?.nextRound?.id) {
    const newTicket: CartTicket = {
      id: tickets.value.length + 1,
      pickNumbers,
      roundId: lottery.value.nextRound.id,
      lotteryId: lottery.value.id,
      selected: true,
    }
    tickets.value.push(newTicket)
  }
}

const toggleSelectTicket = (ticketId: number) => {
  const ticket = tickets.value.find((ticket) => ticket.id === ticketId)
  if (ticket) {
    ticket.selected = !ticket.selected
  }
}

const removeTicket = (ticketId: number) => {
  const ticketIndex = tickets.value.findIndex(
    (ticket) => ticket.id === ticketId
  )
  if (ticketIndex > -1) {
    tickets.value.splice(ticketIndex, 1)
  }
}

const randomTickets = () => {
  if (lottery.value?.nextRound?.id) {
    for (let index = 0; index < randomTicketsNumber.value; index++) {
      const pickNumbers = bulkRandomRange(
        lottery.value.numberOfItems,
        lottery.value.minValuePerItem,
        lottery.value.maxValuePerItem
      )
      const newTicket: CartTicket = {
        id: uniqueID(),
        pickNumbers,
        roundId: lottery.value.nextRound.id,
        lotteryId: lottery.value.id,
        selected: true,
      }
      tickets.value.push(newTicket)
    }
  }
}

const buyNow = () => {
  cartStore.addTickets(tickets.value)
  router.push({ path: '/cart' })
}
</script>
