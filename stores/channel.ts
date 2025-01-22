import { defineStore } from 'pinia'
import type { ProductInfo } from '~/types/product'

interface ChannelState {
  channelCode: string
  productInfo: ProductInfo | null
  productValue: string
}

export const useChannelStore = defineStore('channel', {
  state: (): ChannelState => ({
    channelCode: '',
    productInfo: null,
    productValue: ''
  }),

  actions: {
    async setChannelCode(code: string) {
      this.channelCode = code
      await this.loadProductInfo()
    },

    async loadProductInfo() {
      // Load product info based on channel code
      // This would typically be an API call
      this.productInfo = {
        isValid: true,
        // Add other product info properties
      }
    },

    initializeProductValue() {
      // Initialize product value based on URL parameters or other logic
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search)
        const channelCode = urlParams.get('ch')
        if (channelCode) {
          this.setChannelCode(channelCode)
        }
      }
    }
  }
}) 