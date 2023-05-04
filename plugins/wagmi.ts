import {
  configureChains,
  createClient,
  connect,
  disconnect,
  Connector,
  fetchBalance,
  fetchToken,
  getContract,
  switchNetwork,
  Chain,
  Client,
} from '@wagmi/core'
import { infuraProvider } from '@wagmi/core/providers/infura'
import { polygonMumbai, goerli, polygon, bsc } from '@wagmi/chains'
import { publicProvider } from '@wagmi/core/providers/public'
import { MetaMaskConnector } from '@wagmi/connectors/metaMask'
import { CoinbaseWalletConnector } from '@wagmi/connectors/coinbaseWallet'
import { WalletConnectConnector } from '@wagmi/connectors/walletConnect'
import { QrModalOptions } from '@walletconnect/ethereum-provider/dist/types/EthereumProvider'
import { BinanceWalletConnector } from '~~/wagmi/connectors/binanceWallet'
import { TrustWalletConnector } from '~~/wagmi/connectors/trustWallet'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  let chains: Chain[] = [polygonMumbai, goerli]
  if (config.public.isProduction) {
    chains = [polygonMumbai, goerli]
  }

  let connectors: Connector[] = []
  if (process.client) {
    connectors = [
      new MetaMaskConnector({
        chains,
      }),
      new TrustWalletConnector({
        chains,
      }),
      new CoinbaseWalletConnector({
        chains: [bsc, polygon],
        options: {
          appName: config.public.metadata.appName,
          appLogoUrl: config.public.metadata.appIcon,
        },
      }),
      new WalletConnectConnector({
        chains: [bsc, polygon],
        options: {
          projectId: config.public.walletConnectProjectId,
          showQrModal: true,
          metadata: {
            name: config.public.metadata.appName,
            icons: [config.public.metadata.appIcon],
            url: config.public.metadata.appUrl,
            description: config.public.metadata.appDescription,
          },
          qrModalOptions: {
            themeVariables: {
              '--w3m-z-index': '1000',
            },
          } as QrModalOptions,
        },
      }),
      new BinanceWalletConnector({
        chains: [bsc],
      }),
    ]
  }

  let client: Client<any, any>
  if (process.client) {
    const { provider, webSocketProvider } = configureChains(chains, [
      infuraProvider({ apiKey: config.public.infuraApiKey }),
      publicProvider(),
    ])

    client = createClient({
      autoConnect: true,
      provider,
      webSocketProvider,
      connectors,
    })
  } else {
    const { provider } = configureChains(chains, [publicProvider()])
    client = createClient({
      autoConnect: true,
      provider,
      connectors,
    })
  }

  return {
    provide: {
      wagmi: {
        client,
        chains,
        connect,
        disconnect,
        fetchBalance,
        fetchToken,
        getContract,
        switchNetwork,
      },
    },
  }
})
