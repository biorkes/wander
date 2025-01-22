<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div v-for="(pkg, index) in packages" :key="index"
      class="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 cursor-pointer"
      :class="[
        selectedPackage === pkg.id 
          ? 'ring-2 ring-red-500 ring-offset-2 scale-105 shadow-xl' 
          : 'hover:scale-102'
      ]"
      @click="selectPackage(pkg.id)"
    >
      <!-- Product Image -->
      <div class="relative">
        <img 
          :src="pkg.image" 
          :alt="pkg.name" 
          class="w-full h-48 object-cover"
        >
        <!-- Best Seller Badge -->
        <div 
          v-if="pkg.badge" 
          class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
        >
          {{ localeStore.t(pkg.badge) }}
        </div>
      </div>

      <!-- Product Info -->
      <div class="p-6">
        <h3 class="text-xl font-bold mb-2">{{ pkg.name }}</h3>
        
        <!-- Price Section -->
        <div class="flex items-center gap-3 mb-4">
          <span class="text-2xl font-bold text-red-500">
            {{ localeStore.formatPrice(pkg.totalPrice) }}
          </span>
          <span class="text-sm line-through text-gray-500">
            {{ localeStore.formatPrice(pkg.regularPrice) }}
          </span>
        </div>

        <!-- Savings Badge -->
        <div class="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
          {{ localeStore.t('cart.saving') }} 
          {{ localeStore.formatPrice(pkg.regularPrice - pkg.totalPrice) }}
        </div>

        <!-- Free Delivery Badge -->
        <div v-if="pkg.shipping === 0 && pkg.freeDeliveryBadge" 
          class="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4 ml-2"
        >
          {{ localeStore.t('order.freeDelivery') }}
        </div>

        <!-- Items List -->
        <div class="space-y-1 text-sm text-gray-600 border-t pt-4">
          <div class="font-medium mb-2">{{ localeStore.t('packages.includes') }}:</div>
          <div v-for="item in pkg.items" :key="item.sku" class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ item.qty }}x {{ item.name }}
          </div>
        </div>

        <!-- Select Button -->
        <button 
          class="w-full mt-6 py-2 rounded-lg font-medium transition-colors duration-200 border"
          :class="selectedPackage === pkg.id 
            ? 'bg-red-500 hover:bg-red-600 text-white border-transparent' 
            : 'bg-white hover:bg-red-50 text-red-500 border-red-500'"
          @click.stop="selectPackage(pkg.id)"
        >
          {{ selectedPackage === pkg.id ? localeStore.t('packages.selectedPackage') : localeStore.t('packages.selectPackage') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLocaleStore } from '~/stores/locale'
import { useCartStore } from '~/stores/cart'
import { usePackagesStore } from '~/stores/packages'

const localeStore = useLocaleStore()
const cartStore = useCartStore()
const packagesStore = usePackagesStore()

const props = defineProps<{
  packages: Array<{
    id: string
    name: string
    image: string
    badge?: string
    items: Array<{
      sku: string
      name: string
      qty: number
      price: number
    }>
    totalPrice: number
    regularPrice: number
    deliveryTax: number
    shipping: number
    freeDeliveryBadge: boolean
  }>
  selectedPackage: string | null
}>()

function selectPackage(packageId: string) {
  const pkg = packagesStore.getPackage(packageId)
  if (pkg) {
    cartStore.clearCart(true) // Clear cart but preserve coupon
    cartStore.addPackage(pkg) // Add new package
    emit('select', packageId) // Emit the selection event
  }
}

const emit = defineEmits<{
  (e: 'select', id: string): void
}>()
</script> 