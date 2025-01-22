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
            <div class="relative flex items-center">
              <input 
                type="radio"
                id="door"
                value="door"
                v-model="formData.shippingMethod"
                class="peer sr-only"
              />
              <div class="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-red-500 peer-checked:border-[6px] transition-all"></div>
            </div>
            <label for="door" class="text-sm text-gray-600">
              {{ localeStore.t('order.shippingDoor') }}
            </label>
          </div>
        </div>
      </div>

      <!-- Door delivery fields -->
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
          <div class="relative flex items-center">
            <input 
              type="radio" 
              id="cod" 
              value="cod"
              v-model="formData.paymentMethod"
              class="peer sr-only"
            />
            <div class="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-red-500 peer-checked:border-[6px] transition-all"></div>
          </div>
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

      <!-- Order Summary -->
      <div class="border rounded-md p-4 bg-gray-50">
        <h3 class="font-medium text-gray-900 mb-3">{{ localeStore.t('order.summary') }}</h3>
        
        <!-- Packages -->
        <div class="space-y-2 mb-4">
          <div v-for="pkg in cartStore.items" :key="pkg.id" class="flex justify-between text-sm">
            <div>
              <span class="font-medium">{{ pkg.name }}</span>
              <span v-if="pkg.shipping === 0 && pkg.freeDeliveryBadge" 
                class="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                {{ localeStore.t('order.freeDelivery') }}
              </span>
            </div>
            <span>{{ formatPrice(pkg.items.reduce((total, item) => total + item.price, 0)) }}</span>
          </div>
        </div>

        <!-- Subtotal -->
        <div class="flex justify-between text-sm mb-2">
          <span>{{ localeStore.t('order.subtotal') }}</span>
          <span>{{ formatPrice(cartStore.subtotal) }}</span>
        </div>

        <!-- Shipping -->
        <div class="flex justify-between text-sm mb-2">
          <span>{{ localeStore.t('order.shippingCost') }}</span>
          <span>{{ formatPrice(cartStore.shippingCost) }}</span>
        </div>

        <!-- Discount -->
        <div v-if="cartStore.appliedCoupon" class="flex justify-between text-sm text-green-600 mb-2">
          <span>{{ localeStore.t('order.discount') }}</span>
          <span>-{{ formatPrice(cartStore.discount) }}</span>
        </div>

        <!-- Total -->
        <div class="flex justify-between font-medium text-lg mt-4 pt-4 border-t">
          <span>{{ localeStore.t('order.total') }}</span>
          <span>{{ formatPrice(cartStore.total) }}</span>
        </div>
      </div>

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
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { parsePhoneNumber, AsYouType } from 'libphonenumber-js'
import { useLocaleStore } from '~/stores/locale'
import { useCartStore } from '~/stores/cart'
import { useConfigStore } from '~/stores/config'
import { usePackagesStore } from '~/stores/packages'
import { useCouponsStore } from '~/stores/coupons'
import Button from '~/components/common/Button.vue'
import PhoneInput from '~/components/PhoneInput.vue'
import FormInput from '~/components/FormInput.vue'
import FormCheckbox from '~/components/FormCheckbox.vue'
import type { ShippingMethod } from '~/types/shipping'
import type { CountryCode } from 'libphonenumber-js'

const router = useRouter()
const localeStore = useLocaleStore()
const cartStore = useCartStore()
const configStore = useConfigStore()
const packagesStore = usePackagesStore()
const couponsStore = useCouponsStore()

interface FormData {
  firstName: string
  lastName: string
  phone: string
  address: string
  city: string
  province: string
  zip: string
  email: string
  terms: boolean
  shippingMethod: string
  paymentMethod: string
}

interface FormErrors {
  firstName?: string
  lastName?: string
  phone?: string
  address?: string
  city?: string
  province?: string
  zip?: string
  email?: string
  terms?: string
}

const formData = ref<FormData>({
  firstName: '',
  lastName: '',
  phone: '',
  address: '',
  city: '',
  province: '',
  zip: '',
  email: '',
  terms: false,
  shippingMethod: 'door',
  paymentMethod: 'cod'
})

const errors = ref<FormErrors>({})

const subtotal = computed(() => cartStore.$state.items.reduce((total, pkg) => {
  return total + pkg.items.reduce((pkgTotal, item) => pkgTotal + item.price * item.qty, 0)
}, 0))

const discount = computed(() => {
  if (!cartStore.$state.appliedCoupon) return 0
  return cartStore.$state.appliedCoupon.value
})

const total = computed(() => subtotal.value - discount.value)

const selectedShippingMethod = computed(() => {
  return configStore.shipping_methods[formData.value.shippingMethod] as ShippingMethod
})

const isOfficeShipping = computed(() => false)

const phoneInputRef = ref()
const orderError = ref('')
const isSubmitting = ref(false)

// Validation states
const isNameValid = computed(() => formData.value.firstName.trim().length > 0)
const isLastNameValid = computed(() => formData.value.lastName.trim().length > 0)
const isAddressValid = computed(() => formData.value.address.trim().length > 0)
const isCityValid = computed(() => formData.value.city.trim().length > 0)
const isZipValid = computed(() => formData.value.zip.trim().length > 0)
const isEmailValid = computed(() => formData.value.email.includes('@'))

// Phone formatting and validation
const formatPhoneNumber = (phone: string) => {
  return phone.replace(/[^0-9]/g, '')
}

watch(() => formData.value.phone, (newValue) => {
  formData.value.phone = formatPhoneNumber(newValue)
})

// Form validation
const validateForm = () => {
  let isValid = true
  errors.value = {}

  // Name validation
  if (!formData.value.firstName.trim()) {
    errors.value.firstName = localeStore.t('validation.firstName')
    isValid = false
  }

  if (!formData.value.lastName.trim()) {
    errors.value.lastName = localeStore.t('validation.lastName')
    isValid = false
  }

  // Phone validation
  if (!formData.value.phone) {
    errors.value.phone = localeStore.t('validation.phone')
    isValid = false
  }

  // Email validation
  if (!formData.value.email || !formData.value.email.includes('@')) {
    errors.value.email = localeStore.t('validation.email')
    isValid = false
  }

  // Address validation
  if (!formData.value.address.trim()) {
    errors.value.address = localeStore.t('validation.address')
    isValid = false
  }

  if (!formData.value.city.trim()) {
    errors.value.city = localeStore.t('validation.city')
    isValid = false
  }

  if (!formData.value.province) {
    errors.value.province = localeStore.t('validation.province')
    isValid = false
  }

  if (!formData.value.zip.trim()) {
    errors.value.zip = localeStore.t('validation.zip')
    isValid = false
  }

  // Terms validation
  if (!formData.value.terms) {
    errors.value.terms = localeStore.t('validation.terms')
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
      body: JSON.stringify(formData.value)
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

onMounted(async () => {
  await packagesStore.initializePackages(localeStore.currentLocale)
  await couponsStore.initializeCoupons(localeStore.currentLocale)
})

// Format price helper
const formatPrice = (price: number) => {
  return new Intl.NumberFormat(localeStore.currentLocale, {
    style: 'currency',
    currency: localeStore.config?.currency || 'EUR'
  }).format(price)
}
</script> 