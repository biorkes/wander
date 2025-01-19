<template>
  <section class="py-12 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-2xl font-bold mb-8">{{ localeStore.t('accessories.title') }}</h2>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="hasError" class="text-center py-12">
        <p class="text-red-500">{{ error }}</p>
        <button 
          @click="retryLoad"
          class="mt-4 text-red-500 hover:text-red-600"
        >
          {{ localeStore.t('common.retry') }}
        </button>
      </div>

      <!-- No Accessories State -->
      <div v-else-if="!hasAccessories" class="text-center py-12">
        <p class="text-gray-500">{{ localeStore.t('accessories.noItems') }}</p>
      </div>

      <!-- Accessories Grid -->
      <div 
        v-else 
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AccessoryCard
          v-for="accessory in accessories"
          :key="accessory.id"
          :accessory="accessory"
          @add-to-cart="addToCart"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useLocaleStore } from '~/stores/locale'
import { useCartStore } from '~/stores/cart'
import { useAccessories } from '~/composables/useAccessories'
import type { AccessoryProduct } from '~/types/accessories'

const localeStore = useLocaleStore()
const cartStore = useCartStore()
const { 
  accessories,
  loading: isLoading,
  error,
  fetchAccessories,
  hasAccessories,
  hasError
} = useAccessories()

// Load accessories on mount
onMounted(async () => {
  await fetchAccessories(localeStore.currentLocale)
})

// Watch for locale changes
watch(() => localeStore.currentLocale, async (newLocale) => {
  if (newLocale) {
    await fetchAccessories(newLocale)
  }
})

// Retry loading if there was an error
const retryLoad = () => {
  fetchAccessories(localeStore.currentLocale)
}

// Add accessory to cart
const addToCart = (accessory: AccessoryProduct) => {
  cartStore.addAccessory({
    id: accessory.id,
    sku: accessory.sku,
    name: accessory.name,
    price: accessory.price,
    qty: 1
  })
}</script> 