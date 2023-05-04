import { defineStore } from 'pinia'
import { CartTicket } from '~~/types/ticket'
import { groupBy } from '~~/utils/collection'

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      tickets: [] as CartTicket[],
    }
  },
  getters: {
    ticketsGroupByLotteryId: (state) =>
      groupBy(
        state.tickets.filter((ticket) => ticket.selected),
        (ticket) => ticket.lotteryId
      ),
  },
  actions: {
    async buyTickets() {},
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
  },
})
