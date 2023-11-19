import { SigninRedirectArgs, SigninState, UserManager } from 'oidc-client-ts'
import { OidcConfig, OidcProvider } from './provider'

export class GoogleProvider implements OidcProvider {
  userManager: UserManager

  constructor(config: OidcConfig) {
    let origin = 'http://localhost:3000'
    if (typeof window !== 'undefined' && window?.location?.origin) {
      origin = window.location.origin
    }

    this.userManager = new UserManager({
      authority: config.authorityUrl,
      client_id: config.clientId,
      redirect_uri: `${origin}/auth/oidc/google/callback`,
      post_logout_redirect_uri: origin,
      response_type: config.responseType,
      scope: config.clientScope,
      disablePKCE: true,
    })
  }

  get id() {
    return 'google'
  }

  signInRedirect(params: SigninRedirectArgs = {}): Promise<void> {
    this.userManager.clearStaleState()
    return this.userManager.signinRedirect(params)
  }

  async resolveSigninState(state: string): Promise<SigninState | any> {
    const rawSigninState = await this.userManager.settings.stateStore.get(state)
    if (rawSigninState) {
      return JSON.parse(rawSigninState) as SigninState
    }
  }
}
