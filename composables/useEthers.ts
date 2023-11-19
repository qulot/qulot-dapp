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
  {
    id: 'walletConnect',
    name: 'WalletConnect',
    icon: '/wallet/walletconnect.svg',
  },
  {
    id: 'bnb',
    name: 'Binance Wallet',
    icon: '/wallet/binancewallet.svg',
  },
  {
    id: 'trustWallet',
    name: 'Trust Wallet',
    icon: '/wallet/trustwallet.svg',
  },
])

export function generateWalletDeepLink(wallet: string) {
  const { host, pathname, href } = window.location
  switch (wallet) {
    case 'metaMask':
      return `https://metamask.app.link/dapp/${host}${pathname}`
    case 'coinbaseWallet':
      return `https://go.cb-w.com/dapp?cb_url=${encodeURIComponent(href)}`
    case 'trustWallet':
      return `https://link.trustwallet.com/open_url?url=${encodeURIComponent(
        href
      )}`
  }
}

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

  /**
   * Check current connect is connected
   * @returns
   */
  const isConnected = () => $wagmi.client.status === 'connected'

  /**
   * Check current connect is reconnecting
   * @returns
   */
  const isReconnect = () => $wagmi.client.status === 'reconnecting'

  const getLastConnector = () =>
    $wagmi.client.storage.getItem<string>('wallet', null)

  /**
   * Get current selected chain
   * @param chainId
   * @returns
   */
  const getChain = (chainId: number) =>
    $wagmi.chains.find((chain) => chain.id === chainId)

  /**
   * Check wallet have chainId
   * @param walletChainId
   * @returns
   */
  const isValidWalletChainId = (walletChainId: number) =>
    $wagmi.chains.some((chain) => chain.id === walletChainId)

  /**
   * Get current client provider
   * @returns
   */
  const getProvider = () => $wagmi.client.provider

  /**
   * Connect to wallet with connector
   * @param connector
   */
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

  const connectorIsReady = (connector: string) => {
    const ctor = $wagmi.client.connectors.find((ctor) => ctor.id === connector)
    return ctor?.ready || false
  }

  /**
   * Disconnect wallet
   */
  const disconnect = async () => {
    await $wagmi.disconnect()
    onDisconnect()
  }

  const fetchSigner = async () => {
    return await $wagmi.fetchSigner({ chainId: chainId.value })
  }

  const checkConnection = () => {
    if (isConnected()) {
      onConnected()
    } else if (isReconnect()) {
      const lastConnector = getLastConnector()
      if (lastConnector) {
        connect(lastConnector)
      }
    } else {
      onDisconnect()
    }
  }

  // watchers
  watch(chainId, (newValue) => {
    userSettingChainId.value = newValue
    $wagmi.switchNetwork({ chainId: newValue })
  })

  // computed
  const chainSelected = computed(() => getChain(chainId.value))

  const availableWallets = computed(() =>
    wallets.filter(
      (wallet) =>
        $wagmi.client.connectors.find((ctor) => ctor.id === wallet.id) != null
    )
  )

  // init setting
  const init = () => {
    checkConnection()
  }

  return {
    chainId,
    chains: $wagmi.chains,
    chainSelected,
    wallets,
    availableWallets,
    wallet,
    init,
    connect,
    disconnect,
    getChain,
    getProvider,
    fetchSigner,
    connectorIsReady,
    generateWalletDeepLink,
  }
}
