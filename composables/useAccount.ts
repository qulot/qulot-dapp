import { Address } from '@wagmi/core'
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
  const fetchBalance = async () => {
    if (wallet.value.status === 'disconnected') {
      return
    }
    if (wallet.value.account) {
      balance.value = await $wagmi.fetchBalance({
        address: wallet.value.account as Address,
        chainId: chainId.value,
      })
    }
  }
  const fetchTokenBalance = async () => {
    if (wallet.value.status === 'disconnected') {
      return
    }
    if (token.value && wallet.value.account) {
      tokenBalance.value = await $wagmi.fetchBalance({
        address: wallet.value.account as Address,
        chainId: chainId.value,
        token: token.value.address as Address,
      })
    }
  }
  const updateAccountBalance = async () => {
    // fetch balance first time
    await Promise.all([fetchBalance(), fetchTokenBalance()])
    if (!props.updateOnce) {
      updateBalanceInterval.value = setInterval(async () => {
        await Promise.all([fetchBalance(), fetchTokenBalance()])
      }, props.updateInterval)
    }
  }

  const init = async () => {
    await updateAccountBalance()
  }

  return { init, balance, tokenBalance }
}
