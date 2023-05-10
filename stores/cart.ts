import { BigNumber } from 'ethers/lib/ethers'
import { formatEther, formatUnits } from 'ethers/lib/utils.js'
import { defineStore } from 'pinia'
import { CartItemsGroup, CartTicket } from '~~/types/ticket'
import { groupBy } from '~~/utils/collection'

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      tickets: [] as CartTicket[],
    }
  },
  getters: {
    validTickets: (state) => state.tickets.filter((ticket) => ticket.selected),
    ticketsGroupByLotteryId() {
      const validTickets = this.validTickets as CartTicket[]
      return groupBy(validTickets, (ticket) => ticket.lotteryId)
    },
    ticketsSummaryByLotteryId() {
      const cartItems: CartItemsGroup[] = []
      if (this.ticketsGroupByLotteryId) {
        const lotteryStore = useLotteryStore()
        const { token } = useQulot()
        for (const lotteryId of Object.keys(this.ticketsGroupByLotteryId)) {
          if (lotteryStore.lotteryAsKeys[lotteryId]) {
            const lotteryPricePerTicket =
              lotteryStore.lotteryTicketPrices[lotteryId]
            cartItems.push({
              lotteryId,
              qty: this.ticketsGroupByLotteryId[lotteryId].length,
              lotteryVerboseName:
                lotteryStore.lotteryAsKeys[lotteryId].verboseName,
              lotteryPricePerTicket: formatUnits(
                lotteryPricePerTicket,
                token.value?.decimals
              ),
              total: formatUnits(
                BigNumber.from(lotteryPricePerTicket).mul(
                  this.ticketsGroupByLotteryId[lotteryId].length
                ),
                token.value?.decimals
              ),
            })
          }
        }
      }
      return cartItems
    },
    totalAmount() {
      const lotteryStore = useLotteryStore()
      const validTickets = this.validTickets as CartTicket[]
      const totalAmount = validTickets.reduce(
        (previousValue: BigNumber, ticket: CartTicket) =>
          previousValue.add(
            BigNumber.from(
              lotteryStore.lotteryAsKeys[ticket.lotteryId]?.pricePerTicket ||
                '0'
            )
          ),
        BigNumber.from('0')
      )

      return totalAmount
    },
    finalAmount() {
      const lotteryStore = useLotteryStore()
      const validTickets = this.validTickets as CartTicket[]
      let finalAmount = BigNumber.from('0')

      for (const ticket of validTickets) {
        let ticketPrice = BigNumber.from(
          lotteryStore.lotteryTicketPrices[ticket.lotteryId]
        )
        const discountPercent = lotteryStore.lotteryDiscounts[ticket.lotteryId]

        if (!discountPercent.isZero()) {
          ticketPrice = ticketPrice.sub(
            ticketPrice.mul(discountPercent).div(BigNumber.from(100))
          )
        }

        finalAmount = finalAmount.add(ticketPrice)
      }

      return finalAmount
    },
    totalDiscountPercent() {
      const lotteryStore = useLotteryStore()
      const validTickets = this.validTickets as CartTicket[]
      const ticketsGroupByLotteryId = groupBy(
        validTickets,
        (ticket) => ticket.lotteryId
      )
      return Object.keys(ticketsGroupByLotteryId).reduce(
        (previousValue: BigNumber, lotteryId: string) =>
          previousValue.add(lotteryStore.lotteryDiscounts[lotteryId]),
        BigNumber.from('0')
      )
    },
    isInsufficientTokenBalance() {
      const { tokenBalance } = useAccount()
      if (tokenBalance.value && this.finalAmount) {
        return BigNumber.from(tokenBalance.value.value).lt(this.finalAmount)
      }
      return false
    },
    isAllowCheckout() {
      return this.validTickets.length > 0 && !this.isInsufficientTokenBalance
    },
  },
  actions: {
    saveLocalStorage() {
      localStorage.setItem('cart.tickets', JSON.stringify(this.tickets))
    },
    loadLocalStorage() {
      const cartTicketsJson = localStorage.getItem('cart.tickets')
      if (cartTicketsJson) {
        const tickets: CartTicket[] = JSON.parse(cartTicketsJson)
        this.tickets = [...tickets]
      }
    },
    addTickets(tickets: CartTicket[]) {
      this.tickets.push(...tickets)
      this.saveLocalStorage()
    },
    toggleSelect(ticketId: number) {
      const ticket = this.tickets.find((ticket) => ticket.id === ticketId)
      if (ticket) {
        ticket.selected = !ticket.selected
        this.saveLocalStorage()
      }
    },
    remove(ticketId: number) {
      const ticketIndex = this.tickets.findIndex(
        (ticket) => ticket.id === ticketId
      )
      if (ticketIndex > -1) {
        this.tickets.splice(ticketIndex, 1)
        this.saveLocalStorage()
      }
    },
    async buyTickets() {},
  },
})
