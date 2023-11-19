import moment from 'moment'
import { defineStore } from 'pinia'
import { GET_ROUNDS, GET_ROUND_BY_ID } from '~~/apollo/queries'
import { Round, RoundStatus } from '~~/types/lottery'

type GetRoundsResult = {
  rounds: Round[]
}

type GetRoundResult = {
  round?: Round
}

type GetRoundsFilter = {
  id?: string
  status?: keyof typeof RoundStatus
  startTime?: Date
  lottery?: string
}

type GetRoundSortOrder = {
  orderBy: string
  orderDirection: 'desc' | 'asc'
  skip: number
  first: number
}

export const useRoundStore = defineStore('round', {
  state: () => {
    return {
      rounds: [] as Round[],
      round: null as Round | null,
      sortOrder: {
        orderBy: 'startTime',
        orderDirection: 'desc',
        skip: 0,
        first: 5,
      } as GetRoundSortOrder,
      filter: {
        status: 'Reward',
      } as GetRoundsFilter,
      isLoading: false,
      isComplete: false,
    }
  },
  getters: {
    isExists: (state) => state.round != null,
  },
  actions: {
    clear() {
      this.rounds = []
      this.sortOrder.skip = 0
      this.sortOrder.first = 5
    },
    nextPage() {
      if (!this.isComplete) {
        this.sortOrder.skip += this.sortOrder.first
      }
    },
    setFilter(filter: GetRoundsFilter) {
      this.filter = { ...this.filter, ...filter }
    },
    async fetchRounds() {
      this.isLoading = true
      const { chainId } = useEthers()

      const filterConditions: Record<string, any> = {
        status: this.filter.status,
      }
      if (this.filter.id) {
        filterConditions.id = this.filter.id
      }
      if (this.filter.startTime) {
        const startTime = moment(this.filter.startTime)
        filterConditions.startTime_gte = startTime.startOf('date').unix()
        filterConditions.startTime_lte = startTime.endOf('date').unix()
      }
      if (this.filter.lottery) {
        filterConditions.lottery = this.filter.lottery
      }

      const { data, pending, execute } = await useAsyncQuery<GetRoundsResult>({
        query: GET_ROUNDS,
        clientId: chainId.value.toString(),
        variables: { ...this.sortOrder, filter: filterConditions },
      })

      if (pending) {
        await execute()
      }

      if (data.value && data.value.rounds.length) {
        this.rounds = uniqueBy(
          [...this.rounds, ...data.value.rounds],
          (round) => round.id
        )
        this.isComplete = false
      } else {
        this.isComplete = true
      }
      this.isLoading = false
    },
    async fetchRound(roundId: string) {
      this.isLoading = true
      const { chainId } = useEthers()
      const { data, execute, pending } = await useAsyncQuery<GetRoundResult>({
        query: GET_ROUND_BY_ID,
        clientId: chainId.value.toString(),
        variables: { id: roundId },
        cache: false,
      })
      if (pending) {
        await execute()
      }

      if (data.value && data.value.round) {
        this.round = data.value.round
      }
      this.isLoading = false
    },
  },
})
