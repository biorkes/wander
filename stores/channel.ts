import { defineStore } from 'pinia'
import { useProductCheck } from '~/composables/useProductCheck'

interface ProductInfo {
  isValid: boolean;
  productData?: any;
}

export const useChannelStore = defineStore('channel', {
  persist: {
    storage: typeof window !== 'undefined' ? localStorage : undefined
  },
  state: () => ({
    channelCode: '',
    productInfo: null as ProductInfo | null,
    productValue: ''
  }),
  actions: {
    async setChannelCode(code: string) {
      this.channelCode = code
      
      // Update productValue
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href)
        const baseUrl = `http://${url.host}`
        this.productValue = code ? `${baseUrl}/?ch=${code}` : baseUrl
      }

      const { checkProduct } = useProductCheck()
      this.productInfo = await checkProduct(code)
    },

    initializeProductValue() {
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href)
        const baseUrl = `http://${url.host}`
        const chParam = url.searchParams.get('ch')
        this.productValue = chParam ? `${baseUrl}/?ch=${chParam}` : baseUrl
      }
    }
  }
}) 