import { ethers } from 'ethers'
import QulotLotteryAbi from '~~/data/abi/QulotLottery.json'
import ERC20Abi from '~~/data/abi/ERC20.json'
import { Token } from '~~/types/ethers'

export const useQulot = () => {
  const { chainId, getProvider, fetchSigner } = useEthers()
  const config = useRuntimeConfig()
  const { $wagmi } = useNuxtApp()

  const token = useState<Token>('qulot.token')
  const qulotAddress = computed(() => getQulotAddress())

  const getQulotAddress = () => {
    const contracts = config.public.contracts as Record<string, string>
    if (chainId.value in contracts) {
      const qulotAddress = contracts[chainId.value.toString()]
      return qulotAddress
    }
  }

  const writeQulotLottery = async (
    functionName: string,
    args?: readonly unknown[]
  ) => {
    const signer = await fetchSigner()
    if (signer) {
      const config = await $wagmi.prepareWriteContract({
        abi: QulotLotteryAbi,
        address: qulotAddress.value as `0x${string}`,
        signer,
        functionName,
        args,
      })
      return await $wagmi.writeContract(config)
    }
  }

  const readQulotLottery = async <T>(
    functionName: string,
    args?: readonly unknown[]
  ) => {
    return (await $wagmi.readContract({
      address: qulotAddress.value as `0x${string}`,
      abi: QulotLotteryAbi,
      functionName,
      args,
    })) as Promise<T>
  }

  const writeToken = async (
    functionName: string,
    args?: readonly unknown[]
  ) => {
    const signer = await fetchSigner()
    if (signer) {
      const config = await $wagmi.prepareWriteContract({
        abi: ERC20Abi,
        address: token.value.address as `0x${string}`,
        signer,
        functionName,
        args,
      })
      return await $wagmi.writeContract(config)
    }
  }

  const readToken = async <T>(
    functionName: string,
    args?: readonly unknown[]
  ) => {
    return (await $wagmi.readContract({
      address: token.value.address as `0x${string}`,
      abi: ERC20Abi,
      functionName,
      args,
    })) as Promise<T>
  }

  const getContract = (contract: 'qulot' | 'token') => {
    if (contract === 'qulot') {
      return new ethers.Contract(
        qulotAddress.value as string,
        QulotLotteryAbi,
        getProvider()
      )
    } else if (contract === 'token') {
      return new ethers.Contract(token.value.address, ERC20Abi, getProvider())
    }
  }

  const fetchToken = async () => {
    const fetchTokenResult = await $wagmi.fetchToken({
      address: await readQulotLottery('token'),
      chainId: chainId.value,
    })

    token.value = fetchTokenResult
  }

  const init = async () => {
    // Fetch token info
    await fetchToken()
  }

  return {
    init,
    getContract,
    readQulotLottery,
    writeQulotLottery,
    writeToken,
    readToken,
    token,
    qulotAddress,
  }
}
