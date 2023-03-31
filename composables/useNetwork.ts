import networks from '~~/networks.json'

export const useNetwork = () => {
  // composable
  const networkUserSetting = useCookie<string>('network')

  const runtimeConfig = useRuntimeConfig()
  const getNetworkUserSetting = () =>
    networkUserSetting.value || runtimeConfig.defaultNetworkKey

  // state
  const networkSetting = useState<string>('network.setting', () =>
    getNetworkUserSetting()
  )

  // watchers
  const onNetworkSettingChange = (networkSetting: string) => {
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
