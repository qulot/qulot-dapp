import { defineStore } from 'pinia'
import { utils } from 'ethers'
import { KeyValue } from '~~/types/keyvalue'
import {
  getTotalUsersTotalPrize,
  getUsersOrderByWinAmount,
} from '~~/apollo/queries'
import { User } from '~~/types/user'

type GetTotalUsersTotalPrizeResult = {
  keyValues: KeyValue[]
}

type GetUsersOrderByWinAmountResult = {
  users: User[]
}

const RANKS_AS_INDEX = ['rank1', 'rank2', 'rank3']
const DEFAULT_RANK = 'rank3'
const DEFAULT_RANKS_DATA = [
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
]

export const useHomeStore = defineStore('home', {
  state: () => {
    return {
      totalUsers: 10000,
      totalPrize: 100000,
      ranks: [...DEFAULT_RANKS_DATA],
    }
  },
  actions: {
    async fetchTotalUsersTotalPrize() {
      const { chainId } = useEthers()

      const { data } = await useAsyncQuery<GetTotalUsersTotalPrizeResult>({
        query: getTotalUsersTotalPrize,
        clientId: chainId.value.toString(),
      })

      const totalUsersTotalPrize = data.value?.keyValues.reduce(
        (obj, kValue) => ({ ...obj, [kValue.id]: kValue.value }),
        {} as Record<string, string>
      )

      if (
        totalUsersTotalPrize &&
        totalUsersTotalPrize.totalUsers &&
        totalUsersTotalPrize.totalPrize
      ) {
        this.totalUsers = parseInt(totalUsersTotalPrize.totalUsers)
        this.totalPrize = parseFloat(
          utils.formatEther(totalUsersTotalPrize.totalPrize)
        )
      }
    },
    async fetchUsersWinPrizeRanks() {
      const { chainId } = useEthers()
      const { data } = await useAsyncQuery<GetUsersOrderByWinAmountResult>({
        query: getUsersOrderByWinAmount,
        variables: {
          first: 5,
          orderDirection: 'desc',
        },
        clientId: chainId.value.toString(),
      })

      if (data.value?.users.length) {
        this.ranks = data.value.users.map((user, index) => ({
          address: user.id,
          prize: utils.formatEther(user.totalWinAmount),
          rank: RANKS_AS_INDEX[index] || DEFAULT_RANK,
        }))
      }
    },
  },
})
