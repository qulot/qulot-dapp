import { GoogleProvider } from '~~/oidc/googleProvider'
import { OidcProvider } from '~~/oidc/provider'

export const useOidc = () => {
  const config = useRuntimeConfig()
  const googleProvider = new GoogleProvider({
    authorityUrl: config.public.oidc.google.endpoint,
    clientId: config.public.oidc.google.clientId,
    clientScope: 'openid profile email',
    responseType: 'code',
  })

  const oidcProviders = reactive<Record<string, OidcProvider>>({
    [googleProvider.id]: googleProvider,
  })

  const signIn = (provider: string, redirectCallback = false) => {
    const params: any = {}
    const route = useRoute()
    if (redirectCallback && route.query.callback) {
      params.extraTokenParams = {
        cb: encodeURIComponent(route.query.callback as string),
      }
    }
    oidcProviders[provider]?.signInRedirect(params)
  }

  const resolveRedirectUrl = async (provider: string) => {
    const route = useRoute()
    if (route.query.state) {
      const signinState = await oidcProviders[provider]?.resolveSigninState(
        route.query.state as string
      )

      if (signinState?.extraTokenParams?.cb) {
        return decodeURIComponent(signinState.extraTokenParams.cb)
      }
    }
  }

  return { oidcProviders, signIn, resolveRedirectUrl }
}
