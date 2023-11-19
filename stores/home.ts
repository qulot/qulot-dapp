import { defineStore } from 'pinia'
import { BigNumber } from 'ethers'
import { KeyValue } from '~~/types/keyvalue'
import {
  GET_TOTAL_USERS_TOTAL_PRIZE,
  GET_USERS_ORDER_BY_WIN_AMOUNT,
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
    prize: '100000000',
    rank: 'rank1',
  },
  {
    address: '0x19C58f64Fccf4b42556f77b818160A729e9D87C1',
    prize: '50000000',
    rank: 'rank2',
  },
  {
    address: '0x19C58f64Fccf4b42556f77b818160A729e9D87C1',
    prize: '10000000',
    rank: 'rank3',
  },
]

export const useHomeStore = defineStore('home', {
  state: () => {
    return {
      totalUsers: '100',
      totalPrize: '1000000000',
      ranks: [...DEFAULT_RANKS_DATA],
    }
  },
  actions: {
    async fetchTotalUsersTotalPrize() {
      const { chainId } = useEthers()

      const { data, pending, execute } =
        await useAsyncQuery<GetTotalUsersTotalPrizeResult>({
          query: GET_TOTAL_USERS_TOTAL_PRIZE,
          clientId: chainId.value.toString(),
        })

      if (pending.value) {
        await execute()
      }

      const totalUsersTotalPrize = data.value?.keyValues.reduce(
        (obj, kValue) => ({ ...obj, [kValue.id]: kValue.value }),
        {} as Record<string, string>
      )

      if (
        totalUsersTotalPrize &&
        totalUsersTotalPrize.totalUsers &&
        parseInt(totalUsersTotalPrize.totalUsers) > parseInt(this.totalUsers) &&
        totalUsersTotalPrize.totalPrize &&
        parseInt(totalUsersTotalPrize.totalPrize) > parseInt(this.totalPrize)
      ) {
        this.totalUsers = totalUsersTotalPrize.totalUsers
        this.totalPrize = totalUsersTotalPrize.totalPrize
      }
    },
    async fetchUsersWinPrizeRanks() {
      const { chainId } = useEthers()
      const { data, pending, execute } =
        await useAsyncQuery<GetUsersOrderByWinAmountResult>({
          query: GET_USERS_ORDER_BY_WIN_AMOUNT,
          variables: {
            first: 5,
            orderDirection: 'desc',
          },
          clientId: chainId.value.toString(),
        })

      if (pending.value) {
        await execute()
      }

      if (data.value?.users.length && data.value.users.length >= 3) {
        this.ranks = data.value.users.map((user, index) => ({
          address: user.id,
          prize: user.totalWinAmount,
          rank: RANKS_AS_INDEX[index] || DEFAULT_RANK,
        }))
      }
    },
  },
})
