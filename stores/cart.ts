import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Package } from '~/types/packages'
import type { Coupon } from '~/types/coupons'

export const useCartStore = defineStore('cart', () => {
  const items = ref<Package[]>([])
  const appliedCoupon = ref<Coupon | null>(null)

  const subtotal = computed(() => {
    return items.value.reduce((total, pkg) => {
      // Don't multiply price by qty as it's already the total package price
      return total + pkg.items.reduce((pkgTotal, item) => pkgTotal + item.price, 0)
    }, 0)
  })

  const shippingCost = computed(() => {
    if (appliedCoupon.value?.type === 'free_shipping') return 0
    return items.value.reduce((total, pkg) => total + pkg.shipping, 0)
  })

  const discount = computed(() => {
    if (!appliedCoupon.value) return 0
    
    if (appliedCoupon.value.type === 'percent') {
      return Math.round((subtotal.value * appliedCoupon.value.value) / 100)
    }
    
    if (appliedCoupon.value.type === 'fixed') {
      return appliedCoupon.value.value
    }

    return 0
  })

  const total = computed(() => {
    return Math.max(0, subtotal.value - discount.value + shippingCost.value)
  })

  function addPackage(pkg: Package) {
    items.value = [pkg]
  }

  function removePackage(packageId: string) {
    items.value = items.value.filter(item => item.id !== packageId)
  }

  function applyCoupon(coupon: Coupon | null) {
    console.log('Applying coupon to cart:', coupon) // Debug log
    appliedCoupon.value = coupon
  }

  function clearCart(preserveCoupon: boolean = true) {
    const currentCoupon = preserveCoupon ? appliedCoupon.value : null
    items.value = []
    appliedCoupon.value = currentCoupon
  }

  return {
    items,
    appliedCoupon,
    subtotal,
    shippingCost,
    discount,
    total,
    addPackage,
    removePackage,
    applyCoupon,
    clearCart
  }
}) 