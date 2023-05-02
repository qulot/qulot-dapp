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
  hydrate(storeState, initialState) {
    // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/43826
    storeState.n = useLocalStorage('key', 0)
  },
})
