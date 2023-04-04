import { defineStore } from 'pinia'
import { KeyValue } from '~~/types/keyvalue'
import { getTotalUsersTotalPrize } from '~~/apollo/queries'
import { formatEther } from 'ethers'

type GetTotalUsersTotalPrizeResult = {
  keyValues: KeyValue[]
}

export const useHomeStore = defineStore('home', {
  state: () => {
    return {
      totalUsers: 10000,
      totalPrize: 100000,
      ranks: [
        {
          address: '0x19C58f64Fccf4b42556f77b818160A729e9D87C1',
          prize: '100,000,000',
          rank: 'rank1',
        },
        {
          address: '0x19C58f64Fccf4b42556f77b818160A729e9D87C1',
          prize: '50,000,000',
          rank: 'rank2',
        },
        {
          address: '0x19C58f64Fccf4b42556f77b818160A729e9D87C1',
          prize: '10,000,000',
          rank: 'rank3',
        },
      ],
    }
  },
  actions: {
    async fetchTotalUsersTotalPrize() {
      const { networkSetting } = useNetwork()
      const { client } = useApolloClient(networkSetting.value.toString())
      const result = await client.query<GetTotalUsersTotalPrizeResult>({
        query: getTotalUsersTotalPrize,
      })

      const totalUsersTotalPrize = result.data.keyValues.reduce(
        (obj, kValue) => ({ ...obj, [kValue.id]: kValue.value }),
        {} as Record<string, string>
      )

      if (totalUsersTotalPrize.totalUsers && totalUsersTotalPrize.totalPrize) {
        this.totalUsers = parseInt(totalUsersTotalPrize.totalUsers)
        this.totalPrize = parseFloat(
          formatEther(totalUsersTotalPrize.totalPrize)
        )
      }
    },
  },
})
