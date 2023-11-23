import { BigNumber } from 'ethers/lib/ethers'
import { formatUnits } from 'ethers/lib/utils.js'
import { defineStore } from 'pinia'
import { GET_ROUNDS_BY_IDS } from '~~/apollo/queries'
import { Round } from '~~/types/lottery'
import { OrderTicket, PaymentReceipt } from '~~/types/payment'
import { CartItemsGroup, CartTicket } from '~~/types/ticket'
import { groupBy } from '~~/utils/collection'

const getOrderTickets = (validTickets: CartTicket[]) => {
  const ticketsGroupByRoundId = groupBy(
    validTickets,
    (ticket) => ticket.roundId
  )

  const ordersTicket = Object.keys(ticketsGroupByRoundId).map<OrderTicket>(
    (roundId) => ({
      roundId,
      tickets: ticketsGroupByRoundId[roundId].map(
        (ticket) => ticket.pickNumbers
      ),
    })
  )
  return ordersTicket
}

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      tickets: [] as CartTicket[],
      buyTicketsLoading: false as boolean,
      ethBuyerAddress: null as string | null | undefined,
      paymentReceipt: { status: 'error' } as PaymentReceipt,
    }
  },
  getters: {
    ticketsRoundIsOpen: (state) =>
      state.tickets.filter((ticket) => ticket.round?.status === 'Open'),
    ticketsSelected: (state) =>
      state.tickets.filter((ticket) => ticket.selected),
    validTickets: (state) =>
      state.tickets.filter(
        (ticket) => ticket.selected && ticket.round?.status === 'Open'
      ),
    ticketsSummaryByLotteryId() {
      const lotteryStore = useLotteryStore()

      const validTickets = this.validTickets as CartTicket[]
      const ticketsGroupByLotteryId = groupBy(
        validTickets,
        (ticket) => ticket.lotteryId
      )

      const cartItems: CartItemsGroup[] = []
      for (const lotteryId of Object.keys(ticketsGroupByLotteryId)) {
        if (!lotteryStore.lotteryAsKeys[lotteryId]) {
          continue
        }

        const lotteryPricePerTicket =
          lotteryStore.lotteryTicketPrices[lotteryId]
        cartItems.push({
          lotteryId,
          qty: ticketsGroupByLotteryId[lotteryId].length,
          lotteryVerboseName: lotteryStore.lotteryAsKeys[lotteryId].verboseName,
          lotteryPricePerTicket,
          total: BigNumber.from(lotteryPricePerTicket).mul(
            ticketsGroupByLotteryId[lotteryId].length
          ),
        })
      }
      return cartItems
    },
    isAllowCheckout() {
      const paymentReceipt = this.paymentReceipt as PaymentReceipt
      return this.validTickets.length > 0 && paymentReceipt.status === 'success'
    },
    finalAmount(state) {
      return state.paymentReceipt.finalAmount || BigNumber.from('0')
    },
    finalAmountFiat(state) {
      return {
        amount: state.paymentReceipt.finalAmountFiat,
        currency: state.paymentReceipt.currencyFiat,
      }
    },
    totalAmount(state) {
      return state.paymentReceipt.totalAmount || BigNumber.from('0')
    },
    totalAmountFiat(state) {
      return {
        amount: state.paymentReceipt.totalAmountFiat,
        currency: state.paymentReceipt.currencyFiat,
      }
    },
    totalDiscount(state) {
      return state.paymentReceipt.discount || 0
    },
    buyTicketsError(state) {
      return state.paymentReceipt.error
    },
    fees(state) {
      return state.paymentReceipt.fees || []
    },
    hasTickets: (state) => state.tickets.length > 0,
  },
  actions: {
    saveLocalStorage() {
      localStorage.setItem(
        'cart.tickets',
        JSON.stringify(this.tickets, (key, value) => {
          if (key === 'round') {
            return null
          }
          return value
        })
      )
    },
    loadLocalStorage() {
      const cartTicketsJson = localStorage.getItem('cart.tickets')
      if (cartTicketsJson) {
        const tickets: CartTicket[] = JSON.parse(cartTicketsJson)
        this.tickets = [...tickets]
      }
    },
    async refresh() {
      this.buyTicketsLoading = true
      await this.loadRoundData()
      await this.placeOrders()
      this.buyTicketsLoading = false
    },
    addTickets(tickets: CartTicket[]) {
      this.tickets.push(...tickets)
      this.saveLocalStorage()
      this.refresh()
    },
    toggleSelect(ticketId: number) {
      const ticket = this.tickets.find((ticket) => ticket.id === ticketId)
      if (ticket) {
        ticket.selected = !ticket.selected
        this.saveLocalStorage()
        this.refresh()
      }
    },
    remove(ticketId: number) {
      const ticketIndex = this.tickets.findIndex(
        (ticket) => ticket.id === ticketId
      )
      if (ticketIndex > -1) {
        this.tickets.splice(ticketIndex, 1)
        this.saveLocalStorage()
        this.refresh()
      }
    },
    async loadRoundData() {
      const roundIds = uniqueBy(this.tickets.map((ticket) => ticket.roundId))

      if (roundIds.length) {
        const { chainId } = useEthers()
        const { data, execute, pending } = await useAsyncQuery<{
          rounds: Round[]
        }>({
          query: GET_ROUNDS_BY_IDS,
          clientId: chainId.value.toString(),
          variables: {
            ids: roundIds,
          },
        })

        if (pending.value) {
          await execute()
        }

        if (data.value && data.value.rounds.length) {
          const roundsAsKey = keyBy(data.value.rounds, (round) => round.id)
          for (const ticket of this.tickets) {
            if (roundsAsKey[ticket.roundId]) {
              ticket.round = roundsAsKey[ticket.roundId]
            }
          }
        }
      }
    },
    async placeOrders() {
      const { getPayment } = usePayment()
      const orderTickets = getOrderTickets(this.validTickets)
      const orderParams: Record<string, any> = {
        ethBuyerAddress: this.ethBuyerAddress,
      }
      this.paymentReceipt = await getPayment()?.placeOrders(
        orderTickets,
        orderParams
      )
    },
    clear() {
      this.tickets = []
      this.buyTicketsLoading = false
      this.saveLocalStorage()
    },
    async buyTickets() {
      const { getPayment } = usePayment()
      this.buyTicketsLoading = true
      const orderTickets = getOrderTickets(this.validTickets)
      const orderParams: Record<string, any> = {
        ethBuyerAddress: this.ethBuyerAddress,
      }
      this.paymentReceipt = await getPayment()?.executeOrders(
        orderTickets,
        orderParams
      )
      this.buyTicketsLoading = false
      return this.paymentReceipt?.status === 'success'
    },
  },
})
