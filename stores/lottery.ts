import { defineStore } from 'pinia'
import { Lottery } from '~~/types/lottery'
import { GET_LOTTERIES, GET_LOTTERY_BY_ID } from '~~/apollo/queries'

type GetLotteriesResult = {
  lotteries: Lottery[]
}

type GetLotteryByIdResult = {
  lottery: Lottery | null
}

export const useLotteryStore = defineStore('lottery', {
  state: () => {
    return {
      lotteries: [] as Lottery[],
      lottery: null as Lottery | null,
    }
  },
  getters: {
    availableLotteries: (state) =>
      state.lotteries.filter((lottery) => lottery.nextRound != null),
    isExists: (state) => state.lottery != null,
  },
  actions: {
    async fetchLotteryById(id: string) {
      const { chainId } = useEthers()
      const { data } = await useAsyncQuery<GetLotteryByIdResult>({
        query: GET_LOTTERY_BY_ID,
        clientId: chainId.value.toString(),
        variables: {
          id,
        },
      })
      if (data.value?.lottery) {
        this.lottery = data.value.lottery
        this.lottery.nextTick = nextTickOf(
          this.lottery.periodDays,
          this.lottery.periodHourOfDays
        )
      }
    },
    async fetchLotteries() {
      const { chainId } = useEthers()
      const { data } = await useAsyncQuery<GetLotteriesResult>({
        query: GET_LOTTERIES,
        clientId: chainId.value.toString(),
      })
      if (data.value) {
        for (const lottery of data.value.lotteries) {
          lottery.nextTick = nextTickOf(
            lottery.periodDays,
            lottery.periodHourOfDays
          )
        }
        this.lotteries = data.value.lotteries
      }
    },
  },
})
