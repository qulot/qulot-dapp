async function getClientCountry() {
  try {
    const response = await $fetch<{
      country: string
      'geo-ip': string
      ip: string
    }>('https://jsonip.com/')

    return response.country
  } catch (error) {
    console.log('clientCountry error: ', error)
  }

  return null
}

export const useGeo = () => {
  // state
  const country = useState<string | null>('geo.country')

  // methods
  const init = async () => {
    country.value = await getClientCountry()
  }

  return { init, country }
}
