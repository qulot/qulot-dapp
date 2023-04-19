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
      this.tickets = [...tickets]
    },
  },
})
