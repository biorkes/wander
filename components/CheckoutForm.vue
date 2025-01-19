<template>
  <div v-if="cartStore.items.length > 0" class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-2xl font-bold mb-6">{{ localeStore.t('order.checkout') }}</h2>
    
    <form @submit.prevent="submitOrder" class="space-y-6">
      <!-- Hidden country ISO input -->
      <input 
        type="hidden" 
        name="country_iso" 
        :value="localeStore.currentLocale"
      />

      <!-- Error Message -->
      <div v-if="orderError" class="bg-red-50 text-red-500 p-4 rounded mb-4">
        {{ orderError }}
      </div>

      <div class="flex gap-4">
        <div class="flex-1">
          <FormInput
            v-model="formData.firstName"
            :label="localeStore.t('order.firstName')"
            :error="errors.firstName"
            :is-valid="isNameValid"
          />
        </div>
        
        <div class="flex-1">
          <FormInput
            v-model="formData.lastName"
            :label="localeStore.t('order.lastName')"
            :error="errors.lastName"
            :is-valid="isLastNameValid"
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          {{ localeStore.t('order.phone') }}
        </label>
        <PhoneInput
          ref="phoneInputRef"
          v-model="formData.phone"
          :error="errors.phone"
          :placeholder="localeStore.t('order.phone')"
          :country="localeStore.currentLocale.toUpperCase()"
        />
      </div>

      <!-- Shipping Method Selection -->
      <div class="border rounded-md p-4 bg-gray-50 mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-3">
          {{ localeStore.t('order.shipping') }}
        </label>
        <div class="space-y-2">
          <!-- Door Delivery -->
          <div class="flex items-center gap-3">
            <input 
              type="radio"
              id="door"
              value="door"
              v-model="formData.shippingMethod"
              class="text-red-500 focus:ring-red-500"
            />
            <label for="door" class="text-sm text-gray-600">
              {{ localeStore.t('order.shippingDoor') }}
            </label>
          </div>

          <!-- Econt Offices -->
          <div class="flex items-center gap-3">
            <input 
              type="radio"
              id="econt"
              value="econt"
              v-model="formData.shippingMethod"
              class="text-red-500 focus:ring-red-500"
            />
            <label for="econt" class="text-sm text-gray-600">
              {{ localeStore.t('order.shippingOffice') }} - Econt Express
            </label>
          </div>

          <!-- Speedy Offices -->
          <div class="flex items-center gap-3">
            <input 
              type="radio"
              id="speedy"
              value="speedy"
              v-model="formData.shippingMethod"
              class="text-red-500 focus:ring-red-500"
            />
            <label for="speedy" class="text-sm text-gray-600">
              {{ localeStore.t('order.shippingOffice') }} - Speedy
            </label>
          </div>

          <!-- Sameday Lockers -->
          <div class="flex items-center gap-3">
            <input 
              type="radio"
              id="sameday"
              value="sameday"
              v-model="formData.shippingMethod"
              class="text-red-500 focus:ring-red-500"
            />
            <label for="sameday" class="text-sm text-gray-600">
              {{ localeStore.t('order.shippingLocker') }} - Sameday
            </label>
          </div>
        </div>
      </div>

      <!-- Door delivery fields -->
      <template v-if="!isOfficeShipping">
        <FormInput
          v-model="formData.address"
          :label="localeStore.t('order.address')"
          :error="errors.address"
          :is-valid="isAddressValid"
        />
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            {{ localeStore.t('order.province') }}
          </label>
          <select
            v-model="formData.province"
            class="w-full rounded-md border border-gray-300 p-2"
            :class="{ 'border-red-500': errors.province }"
          >
            <option value="">{{ localeStore.t('order.selectProvince') }}</option>
            <option 
              v-for="province in localeStore.config?.provinces" 
              :key="province.code" 
              :value="province.code"
            >
              {{ province.name }}
            </option>
          </select>
          <span v-if="errors.province" class="text-red-500 text-xs">
            {{ errors.province }}
          </span>
        </div>
        
        <div class="flex gap-4">
          <div class="w-[70%]">
            <FormInput
              v-model="formData.city"
              :label="localeStore.t('order.city')"
              :error="errors.city"
              :is-valid="isCityValid"
            />
          </div>
          
          <div class="w-[30%]">
            <FormInput
              v-model="formData.zip"
              :label="localeStore.t('order.zip')"
              :error="errors.zip"
              :is-valid="isZipValid"
            />
          </div>
        </div>
      </template>

      <!-- Office/Locker Location Selection -->
      <template v-else>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            {{ localeStore.t('order.chooseLocation') }}
          </label>
          <div v-if="carrierLocations" class="space-y-4">
            <select
              v-model="formData.selectedOffice"
              class="w-full rounded-md border border-gray-300 p-2"
              :class="{ 'border-red-500': errors.selectedOffice }"
            >
              <option value="">{{ localeStore.t('order.selectLocation') }}</option>
              <option 
                v-for="location in carrierLocations.locations" 
                :key="location.id" 
                :value="location.id"
              >
                {{ location.name }}
              </option>
            </select>
            
            <!-- Selected Location Details -->
            <div v-if="selectedLocationDetails" class="text-sm text-gray-600 bg-gray-50 p-3 rounded">
              <div class="font-medium mb-1">{{ selectedLocationDetails.name }}</div>
              <div>{{ selectedLocationDetails.address }}</div>
              <div>{{ selectedLocationDetails.city }}, {{ selectedLocationDetails.zip }}</div>
            </div>

            <span v-if="errors.selectedOffice" class="text-red-500 text-xs">
              {{ localeStore.t('order.locationRequired') }}
            </span>
          </div>
          <div v-else class="text-gray-500 text-sm">
            {{ localeStore.t('common.loading') }}
          </div>
        </div>
      </template>

      <FormInput
        v-model="formData.email"
        type="email"
        :label="localeStore.t('order.email')"
        :error="errors.email"
        :is-valid="isEmailValid"
      />

      <div class="border rounded-md p-4 bg-gray-50">
        <label class="block text-sm font-medium text-gray-700 mb-3">
          {{ localeStore.t('order.payment') }}
        </label>
        <div class="flex items-center gap-3">
          <input 
            type="radio" 
            id="cod" 
            value="cod"
            v-model="formData.paymentMethod"
            class="text-red-500 focus:ring-red-500"
          />
          <label for="cod" class="text-sm text-gray-600 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {{ localeStore.t('order.paymentCOD') }}
          </label>
        </div>
      </div>

      <FormCheckbox
        v-model="formData.terms"
        id="terms"
        :label="localeStore.t('order.terms')"
        :error="errors.terms"
      />

      <Button 
        type="submit"
        class="w-full bg-red-500 hover:bg-red-600 text-white"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? localeStore.t('common.processing') : localeStore.t('order.submit') }}
      </Button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { parsePhoneNumber, AsYouType } from 'libphonenumber-js'
import { useLocaleStore } from '~/stores/locale'
import { useCartStore } from '~/stores/cart'
import { useChannelStore } from '~/stores/channel'
import Button from '~/components/common/Button.vue'
import PhoneInput from '~/components/PhoneInput.vue'
import FormInput from '~/components/FormInput.vue'
import FormCheckbox from '~/components/FormCheckbox.vue'
import type { Carrier } from '~/types/shipping'

const router = useRouter()
const localeStore = useLocaleStore()
const cartStore = useCartStore()
const channelStore = useChannelStore()

const errors = reactive({
  firstName: '',
  lastName: '', 
  phone: '',
  address: '',
  city: '',
  province: '',
  zip: '',
  email: '',
  terms: '',
  selectedOffice: ''
})

const formData = reactive({
  country_iso: computed(() => localeStore.currentLocale),
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  province: '',
  zip: '',
  shippingMethod: 'door',
  selectedOffice: '',
  terms: false,
  paymentMethod: 'cod',
  channelCode: computed(() => channelStore.channelCode),
  cart: computed(() => {
    const allItems: Array<{ sku: string; name: string; qty: number; price: number }> = []
    cartStore.items.forEach(pkg => {
      pkg.items.forEach(item => {
        allItems.push({
          sku: item.sku,
          name: item.name,
          qty: item.qty,
          price: item.price
        })
      })
    })
    return allItems
  }),
  subtotal: computed(() => cartStore.subtotal),
  total: computed(() => cartStore.total),
  deliveryTax: computed(() => localeStore.config?.delivery_tax || 0),
  coupon: computed(() => {
    if (!cartStore.appliedCoupon) return null
    return {
      code: cartStore.appliedCoupon.code,
      type: cartStore.appliedCoupon.type,
      value: cartStore.appliedCoupon.value,
      discountAmount: cartStore.discount
    }
  })
})

const isOfficeShipping = computed(() => {
  const method = localeStore.config?.shipping_methods[formData.shippingMethod]
  return method?.type === 'office' || method?.type === 'locker'
})

const availableShippingMethods = computed(() => {
  const methods = localeStore.config?.shipping_methods || { door: { id: 'door', name: 'Delivery' } }
  return Object.values(methods)
})

const phoneInputRef = ref()
const orderError = ref('')
const isSubmitting = ref(false)

// Validation states
const isNameValid = computed(() => formData.firstName.trim().length > 0)
const isLastNameValid = computed(() => formData.lastName.trim().length > 0)
const isAddressValid = computed(() => !isOfficeShipping.value && formData.address.trim().length > 0)
const isCityValid = computed(() => !isOfficeShipping.value && formData.city.trim().length > 0)
const isZipValid = computed(() => !isOfficeShipping.value && formData.zip.trim().length > 0)
const isEmailValid = computed(() => formData.email.includes('@'))

// Phone formatting and validation
const formatPhoneNumber = (value: string, countryCode: string) => {
  try {
    const formatter = new AsYouType(countryCode)
    return formatter.input(value)
  } catch {
    return value
  }
}

watch(() => formData.phone, (newValue) => {
  const countryCode = localeStore.currentLocale.toUpperCase()
  formData.phone = formatPhoneNumber(newValue, countryCode)
})

// Form validation
const validateForm = () => {
  let isValid = true
  
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })

  // Name validation
  if (!formData.firstName.trim()) {
    errors.firstName = 'First name is required'
    isValid = false
  }

  if (!formData.lastName.trim()) {
    errors.lastName = 'Last name is required'
    isValid = false
  }

  // Phone validation
  if (!formData.phone) {
    errors.phone = localeStore.t('order.invalidPhone')
    isValid = false
  }

  // Email validation
  if (!formData.email || !formData.email.includes('@')) {
    errors.email = 'Valid email is required'
    isValid = false
  }

  // Shipping validation
  if (isOfficeShipping.value) {
    if (!formData.selectedOffice) {
      errors.selectedOffice = localeStore.t('order.locationRequired')
      isValid = false
    }
  } else {
    if (!formData.address.trim()) {
      errors.address = 'Address is required'
      isValid = false
    }
    if (!formData.city.trim()) {
      errors.city = 'City is required'
      isValid = false
    }
    if (!formData.province) {
      errors.province = 'Province is required'
      isValid = false
    }
    if (!formData.zip.trim()) {
      errors.zip = 'ZIP code is required'
      isValid = false
    }
  }

  // Terms validation
  if (!formData.terms) {
    errors.terms = localeStore.t('order.termsRequired')
    isValid = false
  }

  return isValid
}

const emit = defineEmits<{
  (e: 'formInvalid'): void
}>()

// Form submission
const submitOrder = async () => {
  if (!validateForm()) {
    emit('formInvalid')
    return
  }

  try {
    isSubmitting.value = true
    orderError.value = ''
    
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    const data = await response.json()
    
    if (response.ok && data.status === 'success' && data.orderId) {
      router.push(`/order-confirmation/${data.orderId}`)
    } else {
      throw new Error(data.message || 'Order submission failed')
    }
  } catch (error) {
    console.error('Order submission error:', error)
    orderError.value = error instanceof Error ? error.message : 'Failed to submit order'
  } finally {
    isSubmitting.value = false
  }
}

// Watch shipping method changes
watch(() => formData.shippingMethod, () => {
  formData.selectedOffice = ''
  errors.selectedOffice = ''
})

// Watch selectedOffice changes
watch(() => formData.selectedOffice, (officeId) => {
  if (officeId) {
    const method = localeStore.config?.shipping_methods[formData.shippingMethod]
    const location = method?.locations?.find(loc => loc.id === officeId)
    if (location) {
      formData.address = location.address
      formData.city = location.city
      formData.province = location.province
      formData.zip = location.zip
    }
  }
})

// Dynamic imports for carriers
const loadCarrierLocations = async (carrier: string, locale: string) => {
  try {
    const module = await import(`~/locales/${locale}/carriers/${carrier}.ts`)
    return module.default as Carrier
  } catch (error) {
    console.error(`Failed to load carrier locations for ${carrier}:`, error)
    return null
  }
}

const carrierLocations = ref<Carrier | null>(null)

// Watch for shipping method changes to load appropriate carrier locations
watch(() => formData.shippingMethod, async (newMethod) => {
  // Reset all address-related fields
  formData.selectedOffice = ''
  formData.address = ''
  formData.city = ''
  formData.province = ''
  formData.zip = ''
  errors.selectedOffice = ''
  
  if (newMethod && isOfficeShipping.value) {
    carrierLocations.value = await loadCarrierLocations(newMethod, localeStore.currentLocale)
  } else {
    carrierLocations.value = null
  }
})

// Computed property for selected location details
const selectedLocationDetails = computed(() => {
  if (!carrierLocations.value || !formData.selectedOffice) return null
  
  const location = carrierLocations.value.locations.find(
    loc => loc.id === formData.selectedOffice
  )
  
  if (!location) return null
  
  return {
    name: location.name,
    address: location.address,
    city: location.city,
    province: location.province,
    zip: location.zip
  }
})

// Update template section for location selection
const template = `
      <!-- Office/Locker Location Selection -->
      <template v-else>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            {{ localeStore.t('order.chooseLocation') }}
          </label>
          <div v-if="carrierLocations" class="space-y-4">
            <select
              v-model="formData.selectedOffice"
              class="w-full rounded-md border border-gray-300 p-2"
              :class="{ 'border-red-500': errors.selectedOffice }"
            >
              <option value="">{{ localeStore.t('order.selectLocation') }}</option>
              <option 
                v-for="location in carrierLocations.locations" 
                :key="location.id" 
                :value="location.id"
              >
                {{ location.name }}
              </option>
            </select>
            
            <!-- Selected Location Details -->
            <div v-if="selectedLocationDetails" class="text-sm text-gray-600 bg-gray-50 p-3 rounded">
              <div class="font-medium mb-1">{{ selectedLocationDetails.name }}</div>
              <div>{{ selectedLocationDetails.address }}</div>
              <div>{{ selectedLocationDetails.city }}, {{ selectedLocationDetails.zip }}</div>
            </div>

            <span v-if="errors.selectedOffice" class="text-red-500 text-xs">
              {{ localeStore.t('order.locationRequired') }}
            </span>
          </div>
          <div v-else class="text-gray-500 text-sm">
            {{ localeStore.t('common.loading') }}
          </div>
        </div>
      </template>`
</script> 