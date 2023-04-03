import { ethers } from 'ethers'
import QulotLotteryAbi from '~~/data/abi/QulotLottery.json'

export const useQulot = () => {
  const { networkSetting } = useNetwork()

  const getQulotContract = () => {
    const { contracts } = useRuntimeConfig()
    if (!(networkSetting.value in contracts)) {
      throw createError({
        statusCode: 405,
        statusMessage: `The network ${networkSetting.value} does not support this contract`,
      })
    }
    const qulotAddress =
      contracts[networkSetting.value as keyof typeof contracts]
    const qulotContract = new ethers.Contract(qulotAddress, QulotLotteryAbi)
    return qulotContract
  }
  return { getQulotContract }
}
