<template>
  <ClientOnly>
    <template #fallback>
      <div class="min-h-screen flex items-center justify-center">
        <div class="text-center">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent"></div>
          <p class="mt-4 text-gray-600">
            <template v-if="isLocaleReady">
              {{ localeStore.t('common.loading') }}
            </template>
            <template v-else>
              Loading...
            </template>
          </p>
        </div>
      </div>
    </template>

    <div v-if="isLocaleReady" class="container mx-auto px-4 py-8">
      <h2 class="text-2xl font-bold mb-6">{{ localeStore.t('order.title') }}</h2>
      <div class="flex flex-col md:flex-row gap-8">
        <!-- Left Column - Packages (70%) -->
        <div class="md:w-[70%] space-y-4">
          <h2 class="text-2xl font-bold mb-6">Select Your Package</h2>
          
          <component 
            :is="packageLayout"
            :packages="packages"
            :selected-package="selectedPackage"
            @select="selectPackage"
          />
        </div>

        <!-- Right Column - Cart Summary (30%) -->
        <div class="md:w-[30%]">
          <CartSummary />
          <CheckoutForm class="mt-8" @formInvalid="handleFormInvalid" />
        </div>
      </div>

      <!-- Accessories Section -->
      <AccessoriesSection class="mt-12" />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useChannelStore } from '~/stores/channel'
import { onMounted } from 'vue'
import { useLocaleStore } from '~/stores/locale'
import CartSummary from '~/components/CartSummary.vue'
import { useCartStore } from '~/stores/cart'
import CardPackage from '~/components/packages/CardPackage.vue'
import AccessoriesSection from '~/components/accessories/AccessoriesSection.vue'
import CheckoutForm from '~/components/CheckoutForm.vue'

// Layout options
const packageLayout = computed(() => CardPackage)

const localeStore = useLocaleStore()
const cartStore = useCartStore()
const route = useRoute()
const channelStore = useChannelStore()

// Add a ref to track if locale is ready
const isLocaleReady = ref(false)

// Initialize locale on mount and watch for changes
onMounted(async () => {
  await localeStore.initializeLocale()
  isLocaleReady.value = true
})

// Watch for locale changes
watch(() => localeStore.currentLocale, (newLocale) => {
  if (newLocale) {
    isLocaleReady.value = true
  }
})

const packages = computed(() => {
  if (!localeStore.config) return []

  return Object.entries(localeStore.config.packages).map(([key, pkg]) => {
    const totalPrice = pkg.items.reduce((sum, item) => sum + item.price, 0)
    
    return {
      id: key,
      name: pkg.name,
      image: pkg.image,
      badge: pkg.badge,
      items: pkg.items,
      totalPrice: totalPrice,
      regularPrice: pkg.regularPrice,
      deliveryTax: localeStore.config?.delivery_tax || 0
    }
  })
})

const selectedPackage = computed(() => cartStore.selectedPackageId)

// Check for channel parameter on mount
onMounted(async () => {
  channelStore.initializeProductValue()
  const channelCode = route.query.ch
  if (typeof channelCode === 'string') {
    await channelStore.setChannelCode(channelCode)
    
    if (!channelStore.productInfo?.isValid) {
      console.error('Invalid product for this channel')
    }
  }
})

const selectPackage = (id: string) => {
  const pkg = localeStore.config?.packages[id]
  if (pkg) {
    cartStore.addPackage(id, pkg.items)
  }
}

const handleFormInvalid = () => {
  // Handle form validation errors if needed
  console.log('Form validation failed')
}
</script> 