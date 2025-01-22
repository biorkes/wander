<template>
  <ClientOnly>
    <template #fallback>
      <div class="min-h-screen flex items-center justify-center">
        <div class="text-center">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent"></div>
          <p class="mt-4 text-gray-600">
            <template v-if="isLocaleReady">
              {{ localeStore.t('loading.fallback') }}
            </template>
            <template v-else>
              {{ localeStore.t('loading.fallback') }}
            </template>
          </p>
        </div>
      </div>
    </template>

    <div v-if="isLocaleReady" class="container mx-auto px-4 py-8">
      <h2 class="text-2xl font-bold mb-6">{{ localeStore.t('order.title') }}</h2>
      <div class="flex flex-col md:flex-row gap-8">
        <!-- Left Column - Packages (70%) -->
        <div class="md:w-[70%]">
          <div v-if="isLocaleReady">
            <component 
              :is="packageLayout"
              :packages="packages"
              :selected-package="selectedPackage"
              @select="handlePackageSelect"
            />
          </div>
          <div v-else class="text-center py-8 text-gray-600">
            {{ localeStore.t('loading.fallback') }}
          </div>
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
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useChannelStore } from '~/stores/channel'
import { useLocaleStore } from '~/stores/locale'
import { useConfigStore } from '~/stores/config'
import { usePackagesStore } from '~/stores/packages'
import CartSummary from '~/components/CartSummary.vue'
import { useCartStore } from '~/stores/cart'
import CardPackage from '~/components/packages/CardPackage.vue'
import AccessoriesSection from '~/components/accessories/AccessoriesSection.vue'
import CheckoutForm from '~/components/CheckoutForm.vue'

const localeStore = useLocaleStore()
const cartStore = useCartStore()
const configStore = useConfigStore()
const packagesStore = usePackagesStore()
const route = useRoute()
const channelStore = useChannelStore()

const form = ref({
  shipping_method: 'door'
})

// Layout options
const packageLayout = computed(() => CardPackage)

// Add a ref to track if locale is ready
const isLocaleReady = ref(false)

// Initialize locale and packages on mount
onMounted(async () => {
  await localeStore.initializeLocale()
  await packagesStore.initializePackages(localeStore.currentLocale)
  channelStore.initializeProductValue()
  isLocaleReady.value = true
})

// Watch for locale changes
watch(() => localeStore.currentLocale, async (newLocale) => {
  if (newLocale) {
    await packagesStore.initializePackages(newLocale)
    isLocaleReady.value = true
  }
})

const packages = computed(() => {
  return Object.entries(packagesStore.packages).map(([key, pkg]) => ({
    id: key,
    name: pkg.name,
    description: pkg.description,
    image: pkg.image,
    badge: pkg.badge,
    items: pkg.items,
    totalPrice: pkg.items.reduce((sum, item) => sum + item.price, 0),
    regularPrice: pkg.regularPrice,
    deliveryTax: pkg.shipping,
    shipping: pkg.shipping,
    freeDeliveryBadge: pkg.freeDeliveryBadge || false
  }))
})

const selectedPackage = computed(() => {
  if (cartStore.items.length === 0) return null
  return cartStore.items[0].id
})

function handlePackageSelect(packageId: string) {
  const pkg = packagesStore.getPackage(packageId)
  if (pkg) {
    cartStore.clearCart()
    cartStore.addPackage(pkg)
  }
}

const handleFormInvalid = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script> 