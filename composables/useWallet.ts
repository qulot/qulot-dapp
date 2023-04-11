import wallets from '~~/data/wallets.json'

export const useWallet = () => {
  // state
  const connected = useState<boolean>('wallet.connected', () => false)
  const connectedAddress = useState<string>(
    'wallet.address',
    () => '0x19C58f64Fccf4b42556f77b818160A729e9D87C1'
  )

  return { wallets, connected, connectedAddress }
}
