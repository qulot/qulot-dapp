import { defineStore } from 'pinia'
import { ApolloError } from '@apollo/client/errors'
import moment from 'moment'
import {
  ACTIVE_QULOT_USER,
  LOGIN_WITH_EMAIL,
  LOGIN_WITH_OIDC,
  QULOT_CONFIRM_RESET_PASSWORD,
  QULOT_RESET_PASSWORD,
  REFRESH_TOKEN,
  REGISTER_QULOT_USER,
} from '~~/apollo/mutations'
import { RegisterQulotUser, QulotUser, QulotJwtToken } from '~~/types/user'
import { isAlreadyExists } from '~~/utils/graphql-error'
import {
  GET_LOGGED_IN_QULOT_USER,
  GET_QULOT_ETH_PRIVATE_KEY,
} from '~~/apollo/queries'

const QULOT_GRAPHQL_CLIENT_ID = 'qulot'

const checkExpireJwt = (jwt: QulotJwtToken) => {
  if (jwt.expiresAt) {
    return moment(jwt.expiresAt) < moment()
  }

  return false
}

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      isLoading: false,
      user: null as QulotUser | null,
      loggedInUser: null as QulotUser | null,
      jwt: null as QulotJwtToken | null,
      ethPrivateKey: null as string | null,
      keepLogin: false,
      errors: [] as any[],
    }
  },
  getters: {
    isAuthenticated: (state) => state.jwt != null && !checkExpireJwt(state.jwt),
    hasLoggedInUser: (state) => state.loggedInUser != null,
  },
  actions: {
    clear() {
      this.isLoading = false
      this.errors = []
      this.ethPrivateKey = null
    },
    saveLocalStorage() {
      if (
        this.jwt?.accessToken &&
        this.jwt?.refreshToken &&
        this.jwt?.expiresAt
      ) {
        localStorage.setItem('qulot.jwt.accessToken', this.jwt.accessToken)
        localStorage.setItem('qulot.jwt.refreshToken', this.jwt.refreshToken)
        localStorage.setItem('qulot.jwt.expiresAt', this.jwt.expiresAt)
      }
      localStorage.setItem('qulot.keepLogin', `${this.keepLogin}`)
    },
    loadLocalStorage() {
      this.jwt = this.getJwt()
      const keepLogin = localStorage.getItem('qulot.keepLogin')
      this.keepLogin = keepLogin === 'true'
    },
    clearLocalStorage() {
      localStorage.removeItem('qulot.jwt.accessToken')
      localStorage.removeItem('qulot.jwt.refreshToken')
      localStorage.removeItem('qulot.jwt.expiresAt')
      localStorage.removeItem('qulot.keepLogin')
    },
    getJwt() {
      const accessToken = localStorage.getItem('qulot.jwt.accessToken')
      const refreshToken = localStorage.getItem('qulot.jwt.refreshToken')
      const expiresAt = localStorage.getItem('qulot.jwt.expiresAt')
      if (accessToken && refreshToken && expiresAt) {
        const jwt: QulotJwtToken = { accessToken, refreshToken, expiresAt }
        return jwt
      }

      return null
    },
    async fetchLoggedInUser() {
      if (!this.jwt || !this.jwt.accessToken || this.loggedInUser) {
        return
      }

      try {
        const { data, pending, execute } = await useAsyncQuery<{
          me?: QulotUser
        }>({
          query: GET_LOGGED_IN_QULOT_USER,
          clientId: QULOT_GRAPHQL_CLIENT_ID,
        })
        if (pending.value) {
          await execute()
        }

        if (data.value && data.value.me) {
          this.loggedInUser = data.value.me
        }
      } catch (error) {
        console.log(error)
      }
    },
    async registerUser(registerUser: RegisterQulotUser) {
      this.isLoading = true
      this.errors = []

      try {
        const registerUserRequest = useMutation<{
          registerUser: QulotUser
        }>(REGISTER_QULOT_USER, {
          clientId: QULOT_GRAPHQL_CLIENT_ID,
          variables: { ...registerUser },
        })

        const result = await registerUserRequest.mutate()
        if (result?.data && result.data.registerUser) {
          this.user = result.data.registerUser
        }
      } catch (error) {
        this.handleResponseError(error)
      }

      this.isLoading = false
    },
    async activeUser(email: string, code: string) {
      this.isLoading = true

      try {
        const activeUserRequest = useMutation<{
          activeUser: QulotUser
        }>(ACTIVE_QULOT_USER, {
          clientId: QULOT_GRAPHQL_CLIENT_ID,
          variables: { email, code },
        })

        const result = await activeUserRequest.mutate()
        if (result?.data && result.data.activeUser) {
          this.user = result.data.activeUser
        }
      } catch (error) {
        this.handleResponseError(error)
      }

      this.isLoading = false
    },
    async login(email: string, password: string, keepLogin: boolean) {
      this.isLoading = true

      try {
        const activeUserRequest = useMutation<{
          login: QulotJwtToken
        }>(LOGIN_WITH_EMAIL, {
          clientId: QULOT_GRAPHQL_CLIENT_ID,
          variables: { email, password },
        })

        const result = await activeUserRequest.mutate()
        if (result?.data && result.data.login) {
          this.jwt = result.data.login
          this.keepLogin = keepLogin
          this.saveLocalStorage()
          await this.fetchLoggedInUser()
        }
      } catch (error) {
        this.handleResponseError(error)
      }

      this.isLoading = false
    },
    async loginWithOIDC(provider: string, credentials: string) {
      this.isLoading = true

      try {
        const activeUserRequest = useMutation<{
          loginWithOIDC: QulotJwtToken
        }>(LOGIN_WITH_OIDC, {
          clientId: QULOT_GRAPHQL_CLIENT_ID,
          variables: { provider, credentials },
        })

        const result = await activeUserRequest.mutate()
        if (result?.data && result.data.loginWithOIDC) {
          this.jwt = result.data.loginWithOIDC
          this.saveLocalStorage()
          await this.fetchLoggedInUser()
        }
      } catch (error) {
        this.handleResponseError(error)
      }

      this.isLoading = false
    },
    logout() {
      this.clearLocalStorage()
      this.jwt = null
      this.loggedInUser = null
    },
    async refreshToken(refreshToken: string) {
      try {
        const refreshTokenRequest = useMutation<{
          refreshToken: QulotJwtToken
        }>(REFRESH_TOKEN, {
          clientId: QULOT_GRAPHQL_CLIENT_ID,
          variables: { refreshToken },
        })

        const result = await refreshTokenRequest.mutate()
        if (result?.data && result.data.refreshToken) {
          this.jwt = result.data.refreshToken
          this.saveLocalStorage()

          return result.data.refreshToken
        }
      } catch (error) {
        console.log(error)

        this.jwt = null
        this.clearLocalStorage()

        throw error
      }
    },
    async resetPassword(email: string) {
      this.isLoading = true
      let success = false

      try {
        const resetPasswordRequest = useMutation<{
          resetPassword: boolean
        }>(QULOT_RESET_PASSWORD, {
          clientId: QULOT_GRAPHQL_CLIENT_ID,
          variables: { email },
        })

        const result = await resetPasswordRequest.mutate()

        success = result.data?.resetPassword === true
      } catch (error) {
        this.handleResponseError(error)
      }

      this.isLoading = false
      return success
    },
    async confirmResetPassword(email: string, password: string, code: number) {
      this.isLoading = true
      let success = false

      try {
        const confirmResetPasswordRequest = useMutation<{
          confirmResetPassword: boolean
        }>(QULOT_CONFIRM_RESET_PASSWORD, {
          clientId: QULOT_GRAPHQL_CLIENT_ID,
          variables: { email, password, code },
        })

        const result = await confirmResetPasswordRequest.mutate()

        success = result.data?.confirmResetPassword === true
      } catch (error) {
        this.handleResponseError(error)
      }

      this.isLoading = false
      return success
    },
    async fetchEthPrivateKey(password: string) {
      this.isLoading = true
      try {
        const getEthPrivateKeyRequest = useMutation<{
          ethPrivateKey: string | null
        }>(GET_QULOT_ETH_PRIVATE_KEY, {
          clientId: QULOT_GRAPHQL_CLIENT_ID,
          variables: { password },
        })

        const result = await getEthPrivateKeyRequest.mutate()
        this.ethPrivateKey = result?.data?.ethPrivateKey as string
      } catch (error) {
        this.handleResponseError(error)
      }

      this.isLoading = false
    },
    handleResponseError(error: any) {
      console.log(error)

      const { $i18n } = useNuxtApp()
      let unknownError = true
      if (error instanceof ApolloError) {
        if (isNotFound(error.graphQLErrors)) {
          console.log(error.graphQLErrors)

          this.errors = [
            $i18n.t('user.userNotFound') + ' ' + $i18n.t('message.plsTryAgain'),
          ]
          unknownError = false
        }

        if (isUnauthenticated(error.graphQLErrors)) {
          console.log(error.graphQLErrors)

          this.errors = [
            $i18n.t('auth.unauthorized') + ' ' + $i18n.t('message.plsTryAgain'),
          ]
          unknownError = false
        }

        if (isAlreadyExists(error.graphQLErrors)) {
          console.log(error.graphQLErrors)

          this.errors = [$i18n.t('user.userAlreadyExists')]
          unknownError = false
        }
      }

      if (unknownError) {
        this.errors = [
          $i18n.t('message.unknownError') +
            ' ' +
            $i18n.t('message.plsTryAgain'),
        ]
      }
    },
  },
})
