import { Balance } from '~~/types/ethers'

interface AccountProps {
  updateOnce?: boolean
  updateInterval?: number
}

export const useAccount = (
  props: AccountProps = { updateOnce: true, updateInterval: 1000 }
) => {
  const { $wagmi } = useNuxtApp()
  const { chainId, wallet } = useEthers()
  const { token } = useQulot()

  // states
  const balance = useState<Balance>('account.balance')
  const tokenBalance = useState<Balance>('account.tokenBalance')
  const updateBalanceInterval = useState<NodeJS.Timer>('account.updateInterval')

  // methods
  const fetchAccountBalance = async () => {
    if (wallet.value.status === 'disconnected') {
      return
    }
    if (wallet.value.account) {
      balance.value = await $wagmi.fetchBalance({
        addressOrName: wallet.value.account,
        chainId: chainId.value,
      })
    }

    if (token.value && wallet.value.account) {
      tokenBalance.value = await $wagmi.fetchBalance({
        addressOrName: wallet.value.account,
        chainId: chainId.value,
        token: token.value.address,
      })
    }
  }
  const startUpdateBalanceInterval = (interval: number) => {
    updateBalanceInterval.value = setInterval(async () => {
      await fetchAccountBalance()
    }, interval)
  }

  const init = async () => {
    if (props.updateOnce) {
      await fetchAccountBalance()
    } else if (props.updateInterval) {
      startUpdateBalanceInterval(props.updateInterval)
    }
  }

  return { init, balance, tokenBalance }
}
