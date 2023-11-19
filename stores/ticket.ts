import { UserRejectedRequestError } from '@wagmi/core'
import { BigNumber } from 'ethers'
import { defineStore } from 'pinia'
import { GET_ROUNDS_BY_IDS } from '~~/apollo/queries'
import { Round } from '~~/types/lottery'
import { Ticket } from '~~/types/ticket'

interface GetTicketIdsByUserResult {
  userTickets: [] & Ticket[]
  cursor: number
}

interface GetRoundsByIdsResult {
  rounds: Round[]
}

function arrayFillByCursor(
  arrayLength: BigNumber,
  cursor: BigNumber,
  size: BigNumber,
  asc = true
) {
  if (asc) {
    if (size.gt(arrayLength.sub(cursor))) {
      size = arrayLength.sub(cursor)
    }
  } else {
    if (size.gt(cursor)) {
      size = cursor
    }
  }

  const arr = new Array(size.toNumber())
  for (let i = 0; i < size.toNumber(); i++) {
    arr[i] = asc ? cursor.add(i) : cursor.sub(i).sub(1)
  }

  return {
    array: arr,
    cursor: asc ? cursor.add(size) : cursor.sub(size),
  }
}

export const useTicketStore = defineStore('ticket', {
  state: () => {
    return {
      tickets: [] as Ticket[],
      isLoading: true,
      isLoaded: false,
      userTicketsCount: 0,
      fetchTicketsArgs: {
        cursor: 0,
        size: 5,
        asc: false,
      },
      isClaimTicketsLoading: false,
      claimTicketsError: null as string | null,
      claimTicketSuccess: false,
    }
  },
  getters: {
    winTickets: (state) => state.tickets.filter((ticket) => ticket.winStatus),
    isEmpty: (state) => state.isLoaded && state.userTicketsCount === 0,
  },
  actions: {
    clear() {
      this.tickets = []
      this.fetchTicketsArgs.cursor = 0
    },
    async init(user: string) {
      this.isLoading = true
      const { readQulotLottery } = useQulot()
      this.userTicketsCount = (
        await readQulotLottery<BigNumber>('getTicketsByUserLength', [user])
      ).toNumber()
      this.fetchTicketsArgs.cursor = this.userTicketsCount
      this.isLoading = false
    },
    async fetchTicketsInfo(tickets: Ticket[]) {
      const { chainId } = useEthers()
      const { data, pending, execute } =
        await useAsyncQuery<GetRoundsByIdsResult>({
          query: GET_ROUNDS_BY_IDS,
          clientId: chainId.value.toString(),
          variables: {
            ids: uniqueBy(tickets.map((ticket) => ticket.roundId.toString())),
          },
        })

      if (pending.value) {
        await execute()
      }

      if (data.value && data.value.rounds.length) {
        const roundsAsKey = keyBy(data.value.rounds, (round) => round.id)
        for (const ticket of tickets) {
          if (roundsAsKey[ticket.roundId.toNumber()]) {
            ticket.round = roundsAsKey[ticket.roundId.toNumber()]
          }
        }
      }
    },
    async fetchTicket(ticketId: BigNumber | string) {
      const { readQulotLottery } = useQulot()
      const fetchTicketResult = await readQulotLottery<[] & Ticket>(
        'getTicket',
        [ticketId]
      )
      const ticket = fromStructToObject<Ticket>(fetchTicketResult)
      return ticket
    },
    async fetchMultiTickets(ticketIds: string[]) {
      const { readsQulotLottery } = useQulot()
      const ticketsMultiCall = ticketIds.map((ticketId) => ({
        functionName: 'getTicket',
        args: [ticketId],
      }))
      const tickets = await readsQulotLottery<[] & Ticket[]>(ticketsMultiCall)
      return tickets.map((ticket) => fromStructToObject<Ticket>(ticket))
    },
    async fetchTicketIds(user: string) {
      const { readsQulotLottery } = useQulot()

      const { array, cursor } = arrayFillByCursor(
        BigNumber.from(this.userTicketsCount),
        BigNumber.from(this.fetchTicketsArgs.cursor),
        BigNumber.from(this.fetchTicketsArgs.size),
        false
      )

      const fetchUserTicketIdsMultiCall = array.map((item) => ({
        functionName: 'ticketsPerUserId',
        args: [user, item],
      }))

      const ticketIds = await readsQulotLottery<[] & BigNumber[]>(
        fetchUserTicketIdsMultiCall
      )

      return { ticketIds, cursor }
    },
    async fetchTickets(user: string) {
      this.isLoading = true
      const { ticketIds, cursor } = await this.fetchTicketIds(user)
      const tickets = await this.fetchMultiTickets(ticketIds)
      if (tickets.length) {
        await this.fetchTicketsInfo(tickets)
        this.tickets = uniqueBy([...this.tickets, ...tickets], (ticket) =>
          ticket.ticketId.toString()
        )
        this.fetchTicketsArgs.cursor = cursor.toNumber()
      }
      this.isLoading = false
      this.isLoaded = true
    },
    async claimTickets(ticketIds: BigNumber[]) {
      this.isClaimTicketsLoading = true
      this.claimTicketSuccess = false
      const { writeQulotLottery } = useQulot()
      console.log(`[claimTickets] tickets: ${ticketIds}`)

      try {
        const result = await (
          await writeQulotLottery('claimTickets', [ticketIds])
        )?.wait()

        console.log(
          `[claimTickets] result status: ${result?.status}, txn: ${result?.transactionHash}`,
          result
        )

        this.claimTicketSuccess = result?.status === 1
      } catch (claimTicketsTxError: any) {
        console.log(claimTicketsTxError)

        if (claimTicketsTxError?.error?.data?.message) {
          this.claimTicketsError = claimTicketsTxError?.error?.data?.message
        }

        if (claimTicketsTxError instanceof UserRejectedRequestError) {
          this.claimTicketsError = claimTicketsTxError.message
        }
      }

      this.isClaimTicketsLoading = false
      return this.claimTicketSuccess
    },
    async refreshTicket(ticketId: BigNumber) {
      const sourceTicket = this.tickets.find(
        (ticket) => ticket.ticketId.toString() === ticketId.toString()
      )
      if (sourceTicket) {
        const newTicket = await this.fetchTicket(ticketId)
        Object.assign(sourceTicket, newTicket)
      }
    },
  },
})
