import { defineStore } from 'pinia'
import { Lottery } from '~~/types/lottery'
import { getLotteries } from '~~/apollo/queries'

type GetLotteriesResult = {
  lotteries: Lottery[]
}

export const useLotteryStore = defineStore('lottery', {
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
    async fetchLotteries() {
      const { chainId } = useEthers()
      const { data } = await useAsyncQuery<GetLotteriesResult>({
        query: getLotteries,
        clientId: chainId.value.toString(),
      })
      if (data.value) {
        this.lotteries = data.value.lotteries
      }
    },
  },
})
