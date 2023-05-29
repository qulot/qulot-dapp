import { BigNumber } from 'ethers'
import { defineStore } from 'pinia'
import { GET_ROUNDS_BY_IDS } from '~~/apollo/queries'
import { Round } from '~~/types/lottery'
import { Ticket } from '~~/types/ticket'

interface GetTicketIdsByUserResult {
  ids: BigNumber[]
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
        asc: false,
      },
    }
  },
  actions: {
    clear() {
      this.tickets = []
      this.fetchTicketsArgs.cursor = 0
    },
    async init() {
      const { address } = useAccount()
      const { readQulotLottery } = useQulot()
      const ticketIdsByUserLength = await readQulotLottery<BigNumber>(
        'getTicketIdsByUserLength',
        [address.value]
      )
      this.fetchTicketsArgs.cursor = ticketIdsByUserLength.toNumber()
    },
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
          this.fetchTicketsArgs.asc,
        ])

      const fetchTicket = async (ticketId: BigNumber) => {
        const fetchTicketResult = await readQulotLottery<[] & Ticket>(
          'getTicket',
          [ticketId]
        )
        const ticket = fromStructToObject<Ticket>(fetchTicketResult)
        ticket.id = ticketId
        return ticket
      }

      const tickets: Ticket[] = await Promise.all(
        ticketIds.map((ticketId) => fetchTicket(ticketId))
      )

      if (tickets.length) {
        const { data } = await useAsyncQuery<GetRoundsByIdsResult>({
          query: GET_ROUNDS_BY_IDS,
          clientId: chainId.value.toString(),
          variables: {
            ids: uniqueBy(tickets.map((ticket) => ticket.roundId.toString())),
          },
        })

        if (data.value && data.value.rounds.length) {
          const roundsAsKey = keyBy(data.value.rounds, (round) => round.id)
          console.log(roundsAsKey)

          for (const ticket of tickets) {
            if (roundsAsKey[ticket.roundId.toNumber()]) {
              ticket.round = roundsAsKey[ticket.roundId.toNumber()]
            }
          }
        }

        this.tickets = uniqueBy([...this.tickets, ...tickets], (ticket) =>
          ticket.id.toString()
        )

        this.fetchTicketsArgs.cursor = cursor
      }
      this.isLoading = false
    },
  },
})
