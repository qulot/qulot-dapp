import { BigNumber } from 'ethers/lib/ethers'
import { formatEther, parseEther } from 'ethers/lib/utils.js'
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
        for (const lotteryId of Object.keys(this.ticketsGroupByLotteryId)) {
          if (lotteryStore.lotteryAsKeys[lotteryId]) {
            const lotteryPricePerTicket =
              lotteryStore.lotteryAsKeys[lotteryId]?.pricePerTicket || '0'
            cartItems.push({
              lotteryId,
              qty: this.ticketsGroupByLotteryId[lotteryId].length,
              lotteryVerboseName:
                lotteryStore.lotteryAsKeys[lotteryId].verboseName,
              lotteryPricePerTicket: formatEther(lotteryPricePerTicket),
              total: formatEther(
                BigNumber.from(lotteryPricePerTicket).mul(
                  this.ticketsGroupByLotteryId[lotteryId].length
                )
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
