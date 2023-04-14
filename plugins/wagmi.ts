import { configureChains, createClient, connect, disconnect } from '@wagmi/core'
import { infuraProvider } from '@wagmi/core/providers/infura'
import { polygonMumbai, goerli, polygon, optimism } from '@wagmi/core/chains'
import { publicProvider } from '@wagmi/core/providers/public'
import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask'
import { CoinbaseWalletConnector } from '@wagmi/core/connectors/coinbaseWallet'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  let chains = [polygonMumbai, goerli]
  if (config.public.isProduction) {
    chains = [polygon, optimism]
  }

  const { provider, webSocketProvider } = configureChains(chains, [
    infuraProvider({ infuraId: config.public.infuraApiKey }),
    publicProvider(),
  ])

  const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
    connectors: [
      new MetaMaskConnector(),
      new CoinbaseWalletConnector({
        options: {
          appName: 'qulot.io',
          jsonRpcUrl: 'https://eth-mainnet.alchemyapi.io/v2/yourAlchemyId',
        },
      }),
    ],
  })

  return {
    provide: {
      wagmi: {
        client,
        chains,
        connect,
        disconnect
      },
    },
  }
})
