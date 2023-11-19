import { WriteContractResult } from '@wagmi/core'
import QulotLotteryAbi from '~~/data/abi/QulotLottery.json'
import ERC20Abi from '~~/data/abi/ERC20.json'
import { Address, Token } from '~~/types/ethers'

interface MultiCall {
  functionName: string
  args: unknown[]
}

export const useQulot = () => {
  const { chainId, chainSelected, fetchSigner } = useEthers()
  const config = useRuntimeConfig()
  const { $wagmi } = useNuxtApp()

  const token = useState<Token>('qulot.token')
  const qulotAddress = computed(() => getQulotAddress())
  const explorerContractUrl = computed(() => {
    if (
      chainSelected.value &&
      chainSelected.value.blockExplorers &&
      qulotAddress.value
    ) {
      return `${chainSelected.value.blockExplorers.default.url}/address/${qulotAddress.value}`
    }
  })

  const getQulotAddress = () => {
    const contracts = config.public.contracts as Record<string, string>
    if (chainId.value in contracts) {
      const qulotAddress = contracts[chainId.value.toString()]
      return qulotAddress as Address
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
        address: qulotAddress.value!,
        signer,
        functionName,
        args,
      })
      const result = await $wagmi.writeContract(config)
      return result as WriteContractResult
    }
  }

  const readQulotLottery = async <T>(
    functionName: string,
    args?: readonly unknown[]
  ) => {
    return (await $wagmi.readContract({
      address: qulotAddress.value!,
      abi: QulotLotteryAbi,
      functionName,
      args,
    })) as Promise<T>
  }

  const readsQulotLottery = async <T>(calls: MultiCall[]) => {
    const wagmiMultiCallArgs = calls.map((call) => ({
      ...call,
      address: qulotAddress.value!,
      abi: QulotLotteryAbi,
    }))
    return (await $wagmi.multicall({
      contracts: wagmiMultiCallArgs,
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
        address: token.value.address,
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
      address: token.value.address,
      abi: ERC20Abi,
      functionName,
      args,
    })) as Promise<T>
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
    readQulotLottery,
    readsQulotLottery,
    writeQulotLottery,
    writeToken,
    readToken,
    token,
    qulotAddress,
    explorerContractUrl,
  }
}
