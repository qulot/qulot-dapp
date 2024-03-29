<template>
  <div class="relative pb-4 lg:pb-14">
    <LotteryCountDownCard
      v-if="lottery"
      :lottery="lottery"
      @buy-ticket="buyOnlyOneTicket"
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
              :class="{ 'opacity-30': !nextRoundIsOpen }"
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
                        value: validTickets.length,
                      })
                    }}</span>
                  </div>
                  <span class="w-px h-3 bg-white"></span>
                  <div class="space-x-1 lg:space-x-2">
                    <span>{{ $t('cart.total') }}:</span>
                    <TokenValue
                      :value="totalPrice"
                      show-symbol
                      use-fiat-value
                      hide-subunits
                      class="font-bold text-yellow"
                    />
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
                  :currency-decimals="token.decimals"
                  :selected="item.selected"
                  :price-per-ticket="lottery.pricePerTicket"
                  @select="toggleSelectTicket(item.id)"
                  @delete="removeTicket(item.id)"
                />
              </div>
              <div v-else class="p-2 pt-6 text-center text-content">
                {{ $t('ticket.empty') }}
              </div>
              <div
                class="w-full flex flex-wrap xl:flex-row xl:items-center xl:justify-around p-4"
              >
                <Button
                  class="rounded border-title text-title hover:text-main hover:border-main mr-4"
                  :disabled="!nextRoundIsOpen"
                  @click="showPickNumberModal = true"
                >
                  {{ $t('cart.addTicket') }}
                </Button>
                <Button
                  class="rounded border-title text-title hover:text-main hover:border-main flex-1 xl:mr-4"
                  :disabled="!nextRoundIsOpen"
                  @click="randomTickets"
                >
                  {{ $t('cart.selectRandom', { number: randomTicketsNumber }) }}
                </Button>
                <Button
                  variant="primary"
                  class="rounded text-white w-full mt-3 xl:w-auto xl:mt-0"
                  :disabled="validTickets.length === 0"
                  @click="buyNow"
                  >{{ $t('cart.buyNow') }}</Button
                >
              </div>
            </div>
          </div>
        </div>
        <div class="lg:w-7/12">
          <RoundListPerLottery
            v-if="lottery?.id"
            :lottery-id="lottery?.id"
            :round-id="$route.query.roundId"
          />
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
const localePath = useLocalePath()
const config = useRuntimeConfig()
const { token } = useQulot()
const lotteryStore = useLotteryStore()
const cartStore = useCartStore()
const { isExists, lottery } = storeToRefs(lotteryStore)

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
  ogImage: [
    {
      url: lottery.value?.picture as string,
      alt: lottery.value?.verboseName,
      type: 'image/png',
    },
  ],
  twitterCard: 'app',
})

const showPickNumberModal = ref(false)
const randomTicketsNumber = ref(4)
const tickets = ref<CartTicket[]>([])
const isBuyOnlyOneTicket = ref(false)

const validTickets = computed(() =>
  tickets.value.filter((ticket) => ticket.selected)
)

const totalPrice = computed(() => {
  if (
    lottery.value?.pricePerTicket &&
    validTickets.value.length &&
    token.value
  ) {
    return BigNumber.from(lottery.value?.pricePerTicket).mul(
      validTickets.value.length
    )
  }
})

const nextRoundIsOpen = computed(() => {
  return lottery.value?.nextRound?.status === 'Open'
})

const buyOnlyOneTicket = () => {
  isBuyOnlyOneTicket.value = true
  showPickNumberModal.value = true
}

const pickNumberOnConfirm = (pickNumbers: number[]) => {
  if (lottery.value?.nextRound?.id) {
    pickNumbers.sort((a, b) => a - b)
    const newTicket: CartTicket = {
      id: tickets.value.length + 1,
      pickNumbers,
      roundId: lottery.value.nextRound.id,
      lotteryId: lottery.value.id,
      selected: true,
    }
    tickets.value.push(newTicket)

    if (isBuyOnlyOneTicket.value) {
      buyNow()
    }
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
      pickNumbers.sort((a, b) => a - b)
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

const buyNow = async () => {
  cartStore.addTickets(validTickets.value)
  console.log(await router.push(localePath({ name: 'cart' })))
}

let fetchLotteryPollInterval: NodeJS.Timer | null = null

onMounted(() => {
  fetchLotteryPollInterval = setInterval(() => {
    lotteryStore.fetchLotteryById(route.params.id as string)
  }, 30000)
})

onUnmounted(() => {
  if (fetchLotteryPollInterval) {
    clearInterval(fetchLotteryPollInterval)
  }
})
</script>
