import { Wallet } from '~~/types/wallet'

export type ConnectStatus =
  | 'connecting'
  | 'connected'
  | 'reconnecting'
  | 'disconnected'

export interface ConnectWallet {
  account?: string
  status: ConnectStatus
  chainId?: number
  error?: Error
}

const wallets = reactive<Wallet[]>([
  {
    id: 'metaMask',
    name: 'MetaMask',
    icon: '/wallet/metamask.svg',
  },
  {
    id: 'coinbaseWallet',
    name: 'Coinbase Wallet',
    icon: '/wallet/coinbase.svg',
  },
])

export const useEthers = () => {
  const config = useRuntimeConfig()
  const { $wagmi } = useNuxtApp()

  // states
  const userSettingChainId = useCookie<number>('chainId')
  const chainId = useState(
    'ethers.chainId',
    () => userSettingChainId.value || config.public.defaultChainId
  )

  const wallet = useState<ConnectWallet>('ethers.wallet', () => ({
    status: 'disconnected',
  }))

  // methods
  const onConnected = () => {
    wallet.value.status = $wagmi.client.status
    wallet.value.account = $wagmi.client.data?.account
    wallet.value.chainId = $wagmi.client.data?.chain?.id
  }

  const onDisconnect = () => {
    wallet.value.account = undefined
    wallet.value.status = 'disconnected'
    wallet.value.chainId = undefined
    wallet.value.error = undefined
    $wagmi.client.clearState()
  }

  const onError = (error: Error) => (wallet.value.error = error)
  const onConnecting = () => (wallet.value.status = 'connecting')

  const onChange = () => {
    const newChainId = $wagmi.client.data?.chain?.id
    if (newChainId) {
      if (isValidWalletChainId(newChainId)) {
        onConnected()
      } else {
        disconnect()
      }
    }
  }

  const isConnected = () => $wagmi.client.status === 'connected'
  const isReconnect = () => $wagmi.client.status === 'reconnecting'
  const getChain = (chainId: number) =>
    $wagmi.chains.find((chain) => chain.id === chainId)
  const isValidWalletChainId = (walletChainId: number) =>
    $wagmi.chains.some((chain) => chain.id === walletChainId)

  const connect = async (connector: string) => {
    const ctor = $wagmi.client.connectors.find((ctor) => ctor.id === connector)
    if (ctor) {
      onConnecting()
      const { connector } = await $wagmi.connect({
        connector: ctor,
        chainId: chainId.value,
      })
      connector?.addListener('connect', onConnected)
      connector?.addListener('change', onChange)
      connector?.addListener('disconnect', onDisconnect)
      connector?.addListener('error', onError)
      checkConnection()
    }
  }

  const disconnect = async () => {
    await $wagmi.disconnect()
    onDisconnect()
  }

  const checkConnection = () => {
    if (isConnected() || isReconnect()) {
      onConnected()
    } else {
      onDisconnect()
    }
  }

  // watchers
  watch(chainId, (newValue) => (userSettingChainId.value = newValue))

  // init setting
  const init = async () => {
    checkConnection()
  }

  return {
    chainId,
    chains: $wagmi.chains,
    wallets,
    wallet,
    init,
    connect,
    disconnect,
    getChain,
  }
}
