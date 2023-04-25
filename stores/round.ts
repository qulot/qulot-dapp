import moment from 'moment'
import { defineStore } from 'pinia'
import { GET_ROUNDS } from '~~/apollo/queries'
import { Round, RoundStatus } from '~~/types/lottery'

type GetRoundsResult = {
  rounds: Round[]
}

type GetRoundsFilter = {
  id?: string
  status?: keyof typeof RoundStatus
  startTime?: Date
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
  actions: {
    clear() {
      this.rounds = []
    },
    nextPage() {
      if (!this.isComplete) {
        this.sortOrder.skip += this.sortOrder.first
      }
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

      const { data, execute, pending } = await useAsyncQuery<GetRoundsResult>({
        query: GET_ROUNDS,
        clientId: chainId.value.toString(),
        variables: { ...this.sortOrder, filter: filterConditions },
      })
      if (pending.value) {
        await execute()
      }

      if (data.value && data.value.rounds.length) {
        this.rounds = [...this.rounds, ...data.value.rounds]
        this.isComplete = false
      } else {
        this.isComplete = true
      }
      this.isLoading = false
    },
  },
})
