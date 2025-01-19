<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">
          {{ localeStore.t('orderConfirmation.title') }}
        </h1>
        <p class="text-gray-600">
          {{ localeStore.t('orderConfirmation.subtitle') }}
        </p>
      </div>

      <!-- Order Details -->
      <div v-if="orderData" class="bg-gray-50 rounded-lg p-4 mb-6">
        <h2 class="font-semibold mb-2">{{ localeStore.t('orderConfirmation.orderDetails') }}</h2>
        <div class="space-y-2 text-sm">
          <p>
            <span class="font-medium">{{ localeStore.t('orderConfirmation.orderId') }}:</span> 
            {{ orderData[0].order_id }}
          </p>
          <p>
            <span class="font-medium">{{ localeStore.t('orderConfirmation.name') }}:</span> 
            {{ orderData[0].name }}
          </p>
          <p>
            <span class="font-medium">{{ localeStore.t('orderConfirmation.phone') }}:</span> 
            {{ orderData[0].tel1 }}
          </p>
          <p>
            <span class="font-medium">{{ localeStore.t('orderConfirmation.status') }}:</span> 
            <span class="text-green-600">{{ orderData[0].status }}</span>
          </p>
        </div>
      </div>

      <!-- Back to Home Button -->
      <div class="text-center">
        <NuxtLink 
          to="/" 
          class="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600"
        >
          {{ localeStore.t('orderConfirmation.backToHome') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useLocaleStore } from '~/stores/locale'

const localeStore = useLocaleStore()
const route = useRoute()
const orderData = ref(null)

onMounted(async () => {
  try {
    // Set order data directly from route params
    orderData.value = {
      order_id: route.params.id,
      status: 'success',
      message: 'Imported'
    }
  } catch (error) {
    console.error('Error fetching order details:', error)
  }
})
</script> 