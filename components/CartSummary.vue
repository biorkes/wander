<template>
  <div class="bg-white rounded-lg shadow-md p-4 mb-4">
    <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      {{ localeStore.t('cart.orderSummary') }}
    </h3>
    
    <!-- Cart Items -->
    <div v-if="cartStore.items.length > 0" class="mb-4">
      <div v-for="pkg in cartStore.items" :key="pkg.id" class="mb-4">
        <div class="flex justify-between items-start">
          <div>
            <h4 class="font-medium">{{ pkg.name }}</h4>
            <div class="text-sm text-gray-600" v-for="item in pkg.items" :key="item.id">
              {{ item.qty }}x {{ item.name }}
            </div>
          </div>
          <button @click="removeItem(pkg.id)" class="text-red-500">
            {{ localeStore.t('cart.removeFromCart') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Empty Cart Message -->
    <div v-if="!cartStore.items.length" class="text-center text-gray-500 py-4">
      {{ localeStore.t('cart.empty') }}
    </div>
    
    <!-- Coupon Input -->
    <div v-if="cartStore.items.length > 0" class="border-t pt-4 mb-4">
      <div class="flex gap-2">
        <input 
          type="text" 
          v-model="couponInput"
          :placeholder="localeStore.t('cart.couponPlaceholder')"
          class="flex-1 border rounded px-2 py-1 text-sm"
        />
        <button 
          @click="applyCoupon"
          class="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
        >
          {{ localeStore.t('cart.apply') }}
        </button>
      </div>
      
      <!-- Coupon Error -->
      <div v-if="couponsStore.error" class="mt-2 text-sm text-red-500">
        {{ couponsStore.error }}
      </div>
      
      <!-- Applied Coupon -->
      <div v-if="cartStore.appliedCoupon" class="mt-2 flex items-center justify-between text-sm">
        <span class="text-green-600">
          {{ localeStore.t('cart.discountApplied') }}
          <strong>{{ couponsStore.appliedCode }}</strong>
          ({{ formatCouponValue(cartStore.appliedCoupon) }})
        </span>
        <button 
          @click="removeCoupon"
          class="text-red-500 hover:text-red-600"
        >
          {{ localeStore.t('cart.removeFromCart') }}
        </button>
      </div>
    </div>
    
    <!-- Cart Summary -->
    <div v-if="cartStore.items.length > 0" class="border-t pt-4">
      <!-- Subtotal -->
      <div class="flex justify-between mb-2">
        <span>{{ localeStore.t('cart.itemTotal') }}</span>
        <span>{{ formatPrice(cartStore.subtotal) }}</span>
      </div>
      
      <!-- Shipping -->
      <div class="flex justify-between mb-2">
        <span>{{ localeStore.t('cart.shippingCost') }}</span>
        <span>{{ formatPrice(cartStore.shippingCost) }}</span>
      </div>
      
      <!-- Discount -->
      <div v-if="cartStore.discount > 0" class="flex justify-between mb-2 text-green-600">
        <span>{{ localeStore.t('cart.discountApplied') }}</span>
        <span>-{{ formatPrice(cartStore.discount) }}</span>
      </div>
      
      <!-- Total -->
      <div class="flex justify-between font-bold border-t pt-2">
        <span>{{ localeStore.t('cart.finalTotal') }}</span>
        <span>{{ formatPrice(cartStore.total) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCartStore } from '~/stores/cart'
import { useLocaleStore } from '~/stores/locale'
import { useCouponsStore } from '~/stores/coupons'
import type { Coupon } from '~/types/coupons'

const cartStore = useCartStore()
const localeStore = useLocaleStore()
const couponsStore = useCouponsStore()
const couponInput = ref('')

const couponCode = computed(() => {
  const coupon = cartStore.appliedCoupon
  if (!coupon) return ''
  return Object.keys(couponsStore.coupons).find(code => 
    couponsStore.coupons[code] === coupon
  ) || ''
})

function removeItem(packageId: string) {
  cartStore.removePackage(packageId)
}

async function applyCoupon() {
  if (!couponInput.value.trim()) return
  
  const success = await couponsStore.applyCoupon(couponInput.value)
  if (success) {
    couponInput.value = ''
  }
}

function removeCoupon() {
  couponsStore.removeCoupon()
}

// Format price helper
const formatPrice = (price: number) => {
  return new Intl.NumberFormat(localeStore.currentLocale, {
    style: 'currency',
    currency: localeStore.config?.currency || 'EUR'
  }).format(price)
}

function formatCouponValue(coupon: Coupon) {
  if (coupon.type === 'percent') {
    return `-${coupon.value}%`
  }
  if (coupon.type === 'fixed') {
    return `-${formatPrice(coupon.value)}`
  }
  if (coupon.type === 'free_shipping') {
    return localeStore.t('cart.freeShipping')
  }
  return ''
}
</script> 