import { defineStore } from 'pinia'
import { GET_ROUNDS } from '~~/apollo/queries'
import { Round } from '~~/types/lottery'

type GetRoundsResult = {
  rounds: Round[]
}

export const useRoundStore = defineStore('round', {
  state: () => {
    return {
      rounds: [] as Round[],
      params: {
        orderBy: 'startTime',
        orderDirection: 'desc',
        skip: 0,
        first: 5,
      },
    }
  },
  getters: {},
  actions: {
    async fetchRounds() {
      const { chainId } = useEthers()
      const { data } = await useAsyncQuery<GetRoundsResult>({
        query: GET_ROUNDS,
        clientId: chainId.value.toString(),
        variables: { ...this.params },
      })
      if (data.value) {
        this.rounds = [...data.value.rounds]
      }
    },
  },
})
