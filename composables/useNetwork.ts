import networks from '~~/networks.json'

export const useNetwork = () => {
  // composable
  const networkUserSetting = useCookie<number>('network')

  const runtimeConfig = useRuntimeConfig()
  const getNetworkUserSetting = () =>
    networkUserSetting.value || parseInt(runtimeConfig.defaultNetworkId)

  // state
  const networkSetting = useState<number>('network.setting', () =>
    getNetworkUserSetting()
  )

  // watchers
  const onNetworkSettingChange = (networkSetting: number) => {
    networkUserSetting.value = networkSetting
  }
  watch(networkSetting, (val) => onNetworkSettingChange(val))

  // init setting
  const init = () => {
    networkSetting.value = getNetworkUserSetting()
  }
  onBeforeMount(() => init())

  return { networks, networkSetting, init }
}
