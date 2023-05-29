import { defineStore } from 'pinia'
import { BigNumber } from 'ethers'
import { Lottery } from '~~/types/lottery'
import { GET_LOTTERIES, GET_LOTTERY_BY_ID } from '~~/apollo/queries'
import { keyBy, keyValueBy } from '~~/utils/collection'

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
      isLoadingLottery: false,
    }
  },
  getters: {
    isExists: (state) => state.lottery != null,
    lotteryAsKeys: (state) => keyBy(state.lotteries, (lottery) => lottery.id),
    lotteryDiscounts: (state) =>
      keyValueBy(
        state.lotteries,
        (lottery) => lottery.id,
        (lottery) => BigNumber.from(lottery?.discountPercent || '0')
      ),
    lotteryTicketPrices: (state) =>
      keyValueBy(
        state.lotteries,
        (lottery) => lottery.id,
        (lottery) => BigNumber.from(lottery?.pricePerTicket || '0')
      ),
  },
  actions: {
    async fetchLotteryById(id: string) {
      this.isLoadingLottery = true
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
      this.isLoadingLottery = false
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
