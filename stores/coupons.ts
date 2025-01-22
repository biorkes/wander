import { defineStore } from 'pinia'
import { useCartStore } from './cart'
import type { Coupon, CouponConfig } from '~/types/coupons'
import couponsConfig from '~/config/coupons'

export const useCouponsStore = defineStore('coupons', {
  state: () => ({
    coupons: {} as CouponConfig,
    currentLocale: 'en' as string,
    error: '' as string,
    appliedCode: '' as string
  }),

  actions: {
    async initializeCoupons(locale: string) {
      this.currentLocale = locale
      this.coupons = couponsConfig[locale] || {}
      console.log('Loaded coupons:', this.coupons) // Debug log
    },

    async applyCoupon(code: string): Promise<boolean> {
      this.error = ''
      const normalizedCode = code.toUpperCase()
      console.log('Applying coupon:', normalizedCode) // Debug log
      console.log('Available coupons:', this.coupons) // Debug log

      const coupon = this.coupons[normalizedCode]
      if (!coupon) {
        this.error = 'Invalid coupon code'
        return false
      }

      // Check if coupon is within valid date range
      const now = new Date()
      const validFrom = new Date(coupon.validFrom)
      const validTo = new Date(coupon.validTo)

      if (now < validFrom || now > validTo) {
        this.error = 'Coupon has expired or is not yet valid'
        return false
      }

      const cartStore = useCartStore()
      this.appliedCode = normalizedCode
      cartStore.applyCoupon({ ...coupon, code: normalizedCode })
      return true
    },

    removeCoupon() {
      const cartStore = useCartStore()
      this.appliedCode = ''
      cartStore.applyCoupon(null)
    }
  }
}) 