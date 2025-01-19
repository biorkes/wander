<template>
  <div class="bg-white rounded-lg shadow-md p-4 mb-4">
    <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      {{ localeStore.t('cart.title') }}
    </h3>
    
    <!-- Cart Items -->
    <div v-if="cartStore.items.length > 0" class="mb-4">
      <div v-for="item in cartStore.items" :key="item.packageId" class="mb-4">
        <div class="flex justify-between items-start">
          <div>
            <h4 class="font-medium">{{ getPackageName(item.packageId) }}</h4>
            <div class="text-sm text-gray-600" v-for="product in item.items" :key="product.sku">
              {{ product.qty }}x {{ product.name }}
            </div>
          </div>
          <button @click="removeItem(item.packageId)" class="text-red-500">
            {{ localeStore.t('cart.remove') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Accessories -->
    <div v-if="cartStore.accessories.length > 0" class="mb-4">
      <h4 class="font-medium mb-2">{{ localeStore.t('accessories.title') }}</h4>
      <div v-for="accessory in cartStore.accessories" :key="accessory.id" class="mb-2">
        <div class="flex justify-between items-center">
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <span class="text-sm">{{ accessory.name }}</span>
              <div class="flex items-center gap-1">
                <button 
                  @click="updateQuantity(accessory.id, accessory.qty - 1)"
                  class="text-gray-500 hover:text-gray-700"
                  :disabled="accessory.qty <= 1"
                >
                  -
                </button>
                <span class="text-sm">{{ accessory.qty }}</span>
                <button 
                  @click="updateQuantity(accessory.id, accessory.qty + 1)"
                  class="text-gray-500 hover:text-gray-700"
                >
                  +
                </button>
              </div>
            </div>
            <div class="text-sm text-gray-600">
              {{ localeStore.formatPrice(accessory.price * accessory.qty) }}
            </div>
          </div>
          <button 
            @click="removeAccessory(accessory.id)" 
            class="text-red-500 text-sm"
          >
            {{ localeStore.t('cart.remove') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Empty Cart Message -->
    <div v-if="!cartStore.items.length && !cartStore.accessories.length" class="text-center text-gray-500 py-4">
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
      
      <!-- Applied Coupon -->
      <div v-if="cartStore.appliedCoupon" class="mt-2 flex items-center justify-between text-sm">
        <span class="text-green-600">
          {{ localeStore.t('cart.codeApplied') }} {{ cartStore.appliedCoupon.code }}
        </span>
        <button 
          @click="removeCoupon"
          class="text-red-500 hover:text-red-600"
        >
          {{ localeStore.t('cart.remove') }}
        </button>
      </div>
    </div>
    
    <!-- Cart Summary -->
    <div v-if="cartStore.items.length > 0 || cartStore.accessories.length > 0" class="border-t pt-4">
      <!-- Subtotal -->
      <div class="flex justify-between mb-2">
        <span>{{ localeStore.t('cart.subtotal') }}</span>
        <span>{{ localeStore.formatPrice(cartStore.subtotal) }}</span>
      </div>
      
      <!-- Discount -->
      <div v-if="cartStore.discount > 0" class="flex justify-between mb-2 text-green-600">
        <span>{{ localeStore.t('cart.discount') }}</span>
        <span>-{{ localeStore.formatPrice(cartStore.discount) }}</span>
      </div>
      
      <!-- Total -->
      <div class="flex justify-between font-bold border-t pt-2">
        <span>{{ localeStore.t('cart.total') }}</span>
        <span>{{ localeStore.formatPrice(cartStore.total) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '~/stores/cart'
import { useLocaleStore } from '~/stores/locale'

const cartStore = useCartStore()
const localeStore = useLocaleStore()
const couponInput = ref('')

function getPackageName(packageId: string) {
  return localeStore.config?.packages[packageId]?.name || packageId
}

function removeItem(packageId: string) {
  cartStore.removePackage(packageId)
}

function removeAccessory(accessoryId: string) {
  cartStore.removeAccessory(accessoryId)
}

function updateQuantity(accessoryId: string, qty: number) {
  if (qty < 1) return
  cartStore.updateAccessoryQuantity(accessoryId, qty)
}

function applyCoupon() {
  if (!couponInput.value.trim()) {
    return
  }
  
  if (cartStore.applyCoupon(couponInput.value)) {
    couponInput.value = ''
  } else {
    alert(localeStore.t('cart.invalidCoupon'))
  }
}

function removeCoupon() {
  cartStore.removeCoupon()
}
</script> 