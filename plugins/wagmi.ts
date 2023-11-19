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
  writeContract,
  fetchSigner,
  prepareWriteContract,
  readContract,
  getAccount,
  multicall,
} from '@wagmi/core'
import { infuraProvider } from '@wagmi/core/providers/infura'
import { polygonMumbai, goerli, polygon, bsc } from '@wagmi/chains'
import { MetaMaskConnector } from '@wagmi/connectors/metaMask'
import { CoinbaseWalletConnector } from '@wagmi/connectors/coinbaseWallet'
import { WalletConnectConnector } from '@wagmi/connectors/walletConnect'
import { QrModalOptions } from '@walletconnect/ethereum-provider/dist/types/EthereumProvider'
import { TrustWalletConnector } from '~~/wagmi/connectors/trustWallet'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  let chains: Chain[] = [polygon, polygonMumbai, goerli]
  if (config.public.isProduction) {
    chains = [polygon]
  }

  let connectors: Connector[] = []
  if (process.client) {
    connectors = [
      new MetaMaskConnector({
        chains,
        options: { shimDisconnect: true },
      }),
    ]

    if (config.public.isProduction) {
      connectors = [
        ...connectors,
        new TrustWalletConnector({
          chains,
          options: { shimDisconnect: true },
        }),
        new CoinbaseWalletConnector({
          chains: [polygon],
          options: {
            appName: config.public.metadata.appName,
            appLogoUrl: config.public.metadata.appIcon,
          },
        }),
        new WalletConnectConnector({
          chains: [polygon],
          options: {
            projectId: config.public.walletConnectProjectId,
            showQrModal: true,
            metadata: {
              name: config.public.metadata.appName,
              icons: [config.public.metadata.appIcon],
              url: config.public.metadata.appUrl,
              description: '',
            },
            qrModalOptions: {
              themeVariables: {
                '--wcm-z-index': '1000',
              },
            } as QrModalOptions,
          },
        }),
      ]
    }
  }

  let client: Client<any, any>
  if (process.client) {
    const { provider } = configureChains(chains, [
      infuraProvider({ apiKey: config.public.infuraApiKey }),
    ])

    client = createClient({
      autoConnect: true,
      provider,
      connectors,
    })
  } else {
    const { provider } = configureChains(chains, [
      infuraProvider({ apiKey: config.public.infuraApiKey }),
    ])
    client = createClient({
      autoConnect: false,
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
        writeContract,
        fetchSigner,
        prepareWriteContract,
        readContract,
        getAccount,
        multicall,
      },
    },
  }
})
