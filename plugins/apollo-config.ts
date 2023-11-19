import { createHttpLink, FetchResult, split, from } from '@apollo/client/core'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'
import { provideApolloClients } from '@vue/apollo-composable'
import { GraphQLError } from 'graphql'
import { Observable, getMainDefinition } from '@apollo/client/utilities'
import { storeToRefs } from 'pinia'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

/**
 * See example: https://github.com/nuxt-modules/apollo/issues/442
 */
export default defineNuxtPlugin(() => {
  const envVars = useRuntimeConfig()
  const { endpoints, wsEndpoints } = envVars.public.apollo
  const { clients } = useApollo()
  const authStore = useAuthStore()
  const { jwt, keepLogin } = storeToRefs(authStore)

  if (clients == null) {
    return
  }

  const getAuthHeaders = (headers: Record<string, any> = {}): any => {
    if (jwt.value && jwt.value.accessToken) {
      return {
        ...headers,
        Authorization: `Bearer ${jwt.value.accessToken}`,
      }
    }
    return {
      ...headers,
    }
  }

  for (const [client, httpEndpoint] of Object.entries(endpoints)) {
    if (httpEndpoint && typeof httpEndpoint === 'string' && clients[client]) {
      const apolloClient = clients[client]

      // Default httpLink (main communication for apollo)
      const httpLink = createHttpLink({
        uri: httpEndpoint,
      })

      // Set custom links in the apollo client.
      // This is the link chain. Will be walked through from top to bottom. It can only contain 1 terminating
      // Apollo link, see: https://www.apollographql.com/docs/react/api/link/introduction/#the-terminating-link
      apolloClient.setLink(httpLink)
    }
  }

  if (clients.qulot) {
    const qulotErrorLink = onError(
      ({ response, operation, graphQLErrors, forward }) => {
        const context = operation.getContext()
        if (context.response) {
          const xTraceId = context.response.headers.get('X-Trace-Id')

          if (xTraceId && response?.errors && response.errors.length > 0) {
            response.errors[0].extensions.traceId = xTraceId
          }
        }

        if (graphQLErrors && isUnauthenticated(graphQLErrors)) {
          // ignore 401 error for a refresh request
          if (operation.operationName === 'RefreshToken' || !keepLogin.value)
            return

          const observable = new Observable<FetchResult<Record<string, any>>>(
            (observer) => {
              // used an annonymous function for using an async function
              ;(async () => {
                try {
                  const newToken = await authStore.refreshToken(
                    jwt.value?.refreshToken || ''
                  )

                  if (!newToken) {
                    throw new GraphQLError('Unable to get new access token', {
                      extensions: {
                        code: 'BAD_REQUEST',
                      },
                    })
                  }

                  // Retry the failed request
                  const subscriber = {
                    next: observer.next.bind(observer),
                    error: observer.error.bind(observer),
                    complete: observer.complete.bind(observer),
                  }

                  forward(operation).subscribe(subscriber)
                } catch (err) {
                  observer.error(err)
                }
              })()
            }
          )

          return observable
        }
      }
    )

    const qulotAuthLink = setContext((operation, { headers }) => {
      return {
        headers: getAuthHeaders(headers),
      }
    })

    const qulotHttpLink = createHttpLink({
      uri: endpoints.qulot || 'http://localhost:5000/query',
    })

    const qulotLinks = [qulotErrorLink, qulotAuthLink]

    if (typeof window !== 'undefined') {
      const qulotWsLink = new GraphQLWsLink(
        createClient({
          url: wsEndpoints.qulot || 'ws://localhost:5000/query',
          connectionParams: () => ({ ...getAuthHeaders() }),
        })
      )
      qulotLinks.push(
        split(
          // split based on operation type
          ({ query }) => {
            const definition = getMainDefinition(query)
            return (
              definition.kind === 'OperationDefinition' &&
              definition.operation === 'subscription'
            )
          },
          qulotWsLink,
          qulotHttpLink
        )
      )
    } else {
      qulotLinks.push(qulotHttpLink)
    }

    clients.qulot.setLink(from(qulotLinks))
  }

  provideApolloClients(clients as any)
})
