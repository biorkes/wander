import { type Pinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin((nuxtApp) => {
  if (typeof window !== 'undefined') {  // Only run on client side
    const pinia = nuxtApp.$pinia as Pinia
    pinia.use((() => {
      return piniaPluginPersistedstate
    })())
  }
}) 