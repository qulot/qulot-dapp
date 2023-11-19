import { SigninRedirectArgs, SigninState } from 'oidc-client-ts'

export interface OidcConfig {
  clientId: string
  responseType: string
  clientScope: string
  authorityUrl: string
}

export interface OidcProvider {
  id: string
  signInRedirect(params?: SigninRedirectArgs): Promise<void>
  resolveSigninState(state: string): Promise<SigninState | any>
}
