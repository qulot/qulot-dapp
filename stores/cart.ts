import { defineStore } from 'pinia'
import { CartTicket } from '~~/types/ticket'

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      tickets: [] as CartTicket[],
    }
  },
  getters: {},
  actions: {
    async buyTickets() {},
    addTickets(tickets: CartTicket[]) {
      this.tickets.push(...tickets)
    },
    toggleSelect(ticketId: number) {
      const ticket = this.tickets.find((ticket) => ticket.id === ticketId)
      if (ticket) {
        ticket.selected = !ticket.selected
      }
    },
    remove(ticketId: number) {
      const ticketIndex = this.tickets.findIndex(
        (ticket) => ticket.id === ticketId
      )
      if (ticketIndex > -1) {
        this.tickets.splice(ticketIndex, 1)
      }
    },
  },
})
