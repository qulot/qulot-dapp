import { defineStore } from 'pinia'
import { Lottery } from '~~/types/lottery'
import { getLotteries } from '~~/apollo/queries'

type GetLotteriesResult = {
  lotteries: Lottery[]
}

export const useProductStore = defineStore('product', {
  state: () => {
    return {
      lotteries: [] as Lottery[],
    }
  },
  getters: {
    availableLotteries: (state) =>
      state.lotteries.filter((lottery) => lottery.nextRound != null),
  },
  actions: {
    async getLotteries() {
      const { networkSetting } = useNetwork()
      const { client } = useApolloClient(networkSetting.value.toString())
      const result = await client.query<GetLotteriesResult>({
        query: getLotteries,
      })
      this.lotteries = result.data.lotteries
    },
  },
})
