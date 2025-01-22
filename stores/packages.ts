import { defineStore, acceptHMRUpdate } from 'pinia'
import type { Package, PackageConfig } from '~/types/packages'
import { useCartStore } from './cart'
import packagesConfig from '~/config/packages'

export const usePackagesStore = defineStore('packages', {
  state: () => ({
    packages: {} as PackageConfig,
    currentLocale: 'en' as string
  }),

  actions: {
    async initializePackages(locale: string) {
      this.currentLocale = locale
      this.packages = packagesConfig[locale] || {}

      // Auto-select default package if any
      const defaultPackage = Object.values(this.packages).find(pkg => pkg.isDefault)
      if (defaultPackage) {
        const cartStore = useCartStore()
        cartStore.addPackage(defaultPackage)
      }
    },

    getPackage(id: string): Package | undefined {
      return this.packages[id]
    }
  }
})

// Add HMR support with state preservation
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePackagesStore, import.meta.hot))
  
  // Re-initialize packages when the config changes
  import.meta.hot.accept('../config/packages', async (newModule) => {
    const store = usePackagesStore()
    if (newModule) {
      store.packages = newModule.default[store.currentLocale] || {}
    } else {
      // If module reload failed, try to re-initialize
      await store.initializePackages(store.currentLocale)
    }
  })
} 