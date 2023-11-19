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
      return navigateTo(
        `${window.location.origin}/auth/login?callback=${to.fullPath}`,
        { external: true }
      )
    }
  }
})
