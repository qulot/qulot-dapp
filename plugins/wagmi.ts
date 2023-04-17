import {
  configureChains,
  createClient,
  connect,
  disconnect,
  Connector,
  fetchBalance,
  fetchToken,
  getContract,
} from '@wagmi/core'
import { infuraProvider } from '@wagmi/core/providers/infura'
import { polygonMumbai, goerli, polygon, optimism } from '@wagmi/core/chains'
import { publicProvider } from '@wagmi/core/providers/public'
import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask'
import { CoinbaseWalletConnector } from '@wagmi/core/connectors/coinbaseWallet'
import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  let chains = [polygonMumbai, goerli]
  if (config.public.isProduction) {
    chains = [polygon, optimism]
  }

  let connectors: Connector[] = []
  if (process.client) {
    connectors = [
      new MetaMaskConnector({
        chains,
      }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: config.public.metadata.appName,
          appLogoUrl: 'https://qulot-static.pages.dev/logo.png',
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          infuraId: config.public.infuraApiKey,
          qrcode: true,
          clientMeta: {
            name: config.public.metadata.appName,
            icons: [config.public.metadata.appIcon],
            url: config.public.metadata.appUrl,
            description: config.public.metadata.appDescription,
          },
        },
      }),
    ]
  }

  const { provider, webSocketProvider } = configureChains(chains, [
    infuraProvider({ infuraId: config.public.infuraApiKey }),
    publicProvider(),
  ])

  const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
    connectors,
  })

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
      },
    },
  }
})
