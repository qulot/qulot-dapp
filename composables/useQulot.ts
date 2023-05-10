import { Contract, ethers } from 'ethers'
import QulotLotteryAbi from '~~/data/abi/QulotLottery.json'
import { Token } from '~~/types/ethers'

export const useQulot = () => {
  const { chainId, getProvider } = useEthers()
  const { $wagmi } = useNuxtApp()

  const qulotLottery = useState<Contract>('qulot')
  const token = useState<Token>('qulot.token')

  const getQulotContract = () => {
    const config = useRuntimeConfig()

    const contracts = config.public.contracts as Record<string, string>
    if (!(chainId.value in contracts)) {
      throw createError({
        statusCode: 405,
        statusMessage: `The network ${chainId.value} does not support this contract`,
      })
    }
    const qulotAddress = contracts[chainId.value.toString()]
    const qulotContract = new ethers.Contract(
      qulotAddress,
      QulotLotteryAbi,
      getProvider()
    )
    return qulotContract
  }

  const fetchToken = async () => {
    const fetchTokenResult = await $wagmi.fetchToken({
      address: await qulotLottery.value.token(),
      chainId: chainId.value,
    })

    token.value = fetchTokenResult
  }

  const init = async () => {
    // Init qulot contract
    qulotLottery.value = getQulotContract()

    // Fetch token info
    await fetchToken()
  }

  return { init, qulotLottery, token }
}
