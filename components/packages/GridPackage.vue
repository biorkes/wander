<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="(pkg, index) in packages" :key="index"
        class="bg-white rounded-lg shadow-md p-6 cursor-pointer relative"
        :class="{ 'border-2 border-red-500': selectedPackage === pkg.id }"
        @click="$emit('select', pkg.id)"
      >
        <!-- Best Seller Badge -->
        <div 
          v-if="pkg.badge" 
          class="absolute -top-3 -right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold transform rotate-12 shadow-lg"
        >
          {{ localeStore.t(pkg.badge) }}
        </div>
        
        <div class="flex gap-6">
          <!-- Left side - Text content -->
          <div class="flex-1">
            <h3 class="text-xl font-bold">{{ pkg.name }}</h3>
            <p class="text-green-600 mt-1">
              {{ localeStore.t('cart.saving') }} 
              <strong>{{ localeStore.formatPrice(pkg.regularPrice - pkg.totalPrice) }}</strong>
            </p>
            
            <div class="flex items-center gap-4 mt-4">
              <span class="line-through text-gray-500">
                {{ localeStore.formatPrice(pkg.regularPrice) }}
              </span>
              <span class="text-red-500 font-bold text-xl">
                {{ localeStore.formatPrice(pkg.totalPrice) }}
              </span>
            </div>
            <!-- Show items list -->
            <div class="mt-2 text-sm text-gray-600">
              <div v-for="item in pkg.items" :key="item.sku">
                {{ item.qty }}x {{ item.name }}
              </div>
            </div>
          </div>
          
          <!-- Right side - Image -->
          <div class="w-1/3">
            <img 
              :src="pkg.image" 
              :alt="pkg.name" 
              class="w-full h-32 object-cover rounded-lg"
            >
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useLocaleStore } from '~/stores/locale'
  
  const localeStore = useLocaleStore()
  
  defineProps<{
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
    }>
    selectedPackage: string | null
  }>()
  
  defineEmits<{
    (e: 'select', id: string): void
  }>()
  </script> 