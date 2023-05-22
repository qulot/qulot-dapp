import { defineStore } from 'pinia'
import { GET_ROUNDS_BY_IDS } from '~~/apollo/queries'
import { Round } from '~~/types/lottery'
import { Ticket } from '~~/types/ticket'

interface GetTicketIdsByUserResult {
  ids: string[]
  cursor: number
}

interface GetRoundsByIdsResult {
  rounds: Round[]
}

export const useTicketStore = defineStore('ticket', {
  state: () => {
    return {
      tickets: [] as Ticket[],
      isLoading: false,
      fetchTicketsArgs: {
        cursor: 0,
        size: 5,
      },
    }
  },
  actions: {
    async fetchTickets() {
      this.isLoading = true
      const { chainId } = useEthers()
      const { address } = useAccount()
      const { readQulotLottery } = useQulot()

      const { ids: ticketIds, cursor } =
        await readQulotLottery<GetTicketIdsByUserResult>('getTicketIdsByUser', [
          address.value,
          this.fetchTicketsArgs.cursor,
          this.fetchTicketsArgs.size,
        ])

      const tickets: Ticket[] = []
      for (const ticketId of ticketIds) {
        const ticket = await readQulotLottery<Ticket>('getTicket', [ticketId])
        tickets.push(ticket)
      }

      if (tickets.length) {
        const { data } = await useAsyncQuery<GetRoundsByIdsResult>({
          query: GET_ROUNDS_BY_IDS,
          clientId: chainId.value.toString(),
          variables: {
            ids: uniqueBy(tickets.map((ticket) => ticket.roundId)),
          },
        })

        if (data.value && data.value.rounds.length) {
          const roundsAsKey = keyBy(data.value.rounds, (round) => round.id)
          for (const ticket of tickets) {
            if (roundsAsKey[ticket.roundId]) {
              ticket.round = roundsAsKey[ticket.roundId]
            }
          }
        }

        this.tickets = uniqueBy(
          [...this.tickets, ...tickets],
          (ticket) => ticket.id
        )

        this.fetchTicketsArgs.cursor = cursor
      }

      this.isLoading = false
    },
  },
})
