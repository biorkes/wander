import { defineStore, acceptHMRUpdate } from 'pinia'
import type { CountryConfig, ShippingMethods } from '~/types/shipping'
import config from '~/config/shipping/bg'

export const useConfigStore = defineStore('config', {
  state: () => ({
    config: config as CountryConfig
  }),
  getters: {
    shipping_methods: (state): ShippingMethods => {
      const methods = { ...state.config.shipping_methods }
      // Filter out disabled methods
      Object.keys(methods).forEach(key => {
        if (!methods[key].enabled) {
          delete methods[key]
        }
      })
      return methods
    }
  }
})

// Auto-import
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useConfigStore, import.meta.hot))
} 