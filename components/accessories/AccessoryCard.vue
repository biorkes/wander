<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <!-- Product Image -->
    <div class="relative h-48">
      <img 
        :src="accessory.image" 
        :alt="accessory.name"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Product Info -->
    <div class="p-4">
      <h3 class="text-lg font-semibold mb-2">{{ accessory.name }}</h3>
      <p class="text-gray-600 text-sm mb-4">{{ accessory.description }}</p>
      
      <!-- Price -->
      <div class="flex items-center justify-between mb-4">
        <span class="text-xl font-bold text-red-500">
          {{ localeStore.formatPrice(accessory.price) }}
        </span>
      </div>

      <!-- Add to Cart Button -->
      <button
        @click="$emit('add-to-cart', accessory)"
        class="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        {{ localeStore.t('cart.add') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AccessoryProduct } from '~/types/accessories'
import { useLocaleStore } from '~/stores/locale'

const localeStore = useLocaleStore()

defineProps<{
  accessory: AccessoryProduct
}>()

defineEmits<{
  (e: 'add-to-cart', accessory: AccessoryProduct): void
}>()</script> 