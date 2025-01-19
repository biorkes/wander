import { defineStore } from 'pinia'
import { useLocaleStore } from './locale'
import type { Coupon } from '~/types/coupons'

interface CartItem {
  packageId: string
  items: Array<{
    sku: string
    name: string
    qty: number
    price: number
  }>
}

interface CartAccessory {
  id: string
  sku: number
  name: string
  price: number
  qty: number
}

interface CartState {
  items: CartItem[]
  accessories: CartAccessory[]
  selectedPackageId: string | null
  appliedCoupon: {
    code: string
    type: 'fixed' | 'percent'
    value: number
  } | null
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
    accessories: [],
    selectedPackageId: null,
    appliedCoupon: null
  }),

  getters: {
    subtotal(): number {
      // Calculate packages total
      const packagesTotal = this.items.reduce((sum, item) => {
        return sum + item.items.reduce((itemSum, product) => {
          return itemSum + (Number(product.price) * Number(product.qty))
        }, 0)
      }, 0)

      // Calculate accessories total
      const accessoriesTotal = this.accessories.reduce((sum, item) => {
        return sum + (Number(item.price) * Number(item.qty))
      }, 0)

      return Number(packagesTotal) + Number(accessoriesTotal)
    },

    discount(): number {
      if (!this.appliedCoupon) return 0
      
      // Only apply discount to subtotal, not delivery
      const subtotalValue = this.subtotal
      
      if (this.appliedCoupon.type === 'fixed') {
        return Number(this.appliedCoupon.value) || 0
      } else {
        return Number((Number(subtotalValue) * Number(this.appliedCoupon.value)) / 100) || 0
      }
    },

    total(): number {
      const localeStore = useLocaleStore()
      const deliveryTax = localeStore.config?.delivery_tax || 0
      return Math.max(0, Number(this.subtotal) - Number(this.discount) + Number(deliveryTax))
    }
  },

  actions: {
    addPackage(packageId: string, items: CartItem['items']) {
      // Clear all packages from cart before adding new one
      this.items = []
      
      // Add new package
      this.items.push({
        packageId,
        items: items.map(item => ({
          ...item,
          price: Number(item.price),
          qty: Number(item.qty)
        }))
      })

      this.selectedPackageId = packageId
    },

    removePackage(packageId: string) {
      this.items = this.items.filter(item => item.packageId !== packageId)
      if (this.selectedPackageId === packageId) {
        this.selectedPackageId = null
      }
    },

    addAccessory(accessory: CartAccessory) {
      const existingIndex = this.accessories.findIndex(item => item.id === accessory.id)
      
      const normalizedAccessory = {
        ...accessory,
        price: Number(accessory.price),
        qty: Number(accessory.qty)
      }
      
      if (existingIndex >= 0) {
        // Increment quantity if already in cart
        this.accessories[existingIndex].qty += normalizedAccessory.qty
      } else {
        // Add new accessory
        this.accessories.push(normalizedAccessory)
      }
    },

    removeAccessory(accessoryId: string) {
      this.accessories = this.accessories.filter(item => item.id !== accessoryId)
    },

    updateAccessoryQuantity(accessoryId: string, qty: number) {
      const accessory = this.accessories.find(item => item.id === accessoryId)
      if (accessory) {
        accessory.qty = Number(qty)
      }
    },

    async applyCoupon(code: string) {
      const localeStore = useLocaleStore()
      const normalizedCode = code.toUpperCase()
      
      try {
        // Dynamically import the coupons for the current locale
        /* @vite-ignore */
        const localeCoupons = await import(`../locales/${localeStore.currentLocale}/coupons.ts`).then(m => m.default)
        const coupon = localeCoupons[normalizedCode]
        
        // Check if coupon exists
        if (!coupon) {
          return false
        }

        // Check if coupon is within valid date range
        const now = new Date()
        const validFrom = new Date(coupon.validFrom)
        const validTo = new Date(coupon.validTo)
        
        if (now < validFrom || now > validTo) {
          return false
        }
        
        this.appliedCoupon = {
          code: normalizedCode,
          type: coupon.type,
          value: coupon.value
        }
        return true
      } catch (error) {
        console.error('Error loading coupons:', error)
        return false
      }
    },

    removeCoupon() {
      this.appliedCoupon = null
    },

    clearCart() {
      this.items = []
      this.accessories = []
      this.selectedPackageId = null
      this.appliedCoupon = null
    }
  },

  persist: true
}) 