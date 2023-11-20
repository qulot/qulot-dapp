import { storeToRefs } from 'pinia'

export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    const auth = useAuthStore()
    const { isAuthenticated } = storeToRefs(auth)

    // try load authenticated from local store
    if (!isAuthenticated.value) {
      auth.loadLocalStorage()
    }

    if (!isAuthenticated.value) {
      const localePath = useLocalePath()
      return navigateTo(
        window.location.origin +
          localePath({
            name: 'auth-login',
            query: {
              callback: to.fullPath,
            },
          }),
        { external: true }
      )
    }
  }
})
