<template>
  <div class="relative">
    <input 
      :value="modelValue"
      @input="handleInput"
      type="tel"
      :placeholder="$t('input.phone.placeholder')"
      class="w-full rounded-md border border-gray-300 p-2"
      :class="{ 
        'border-red-500': error,
        'border-green-500': isValid && modelValue 
      }"
    />
    <span v-if="error" class="text-red-500 text-xs">
      {{ error || $t('input.phone.invalid') }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { AsYouType, parsePhoneNumber } from 'libphonenumber-js'
import type { CountryCode } from 'libphonenumber-js'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  modelValue: string
  error?: string
  placeholder?: string
  country: CountryCode
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

// Computed property to check if the phone number is valid
const isValid = computed(() => {
  try {
    if (!props.modelValue) return false
    const phoneNumber = parsePhoneNumber(props.modelValue, { defaultCountry: props.country })
    return phoneNumber?.isValid() || false
  } catch {
    return false
  }
})

const handleInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  let value = input.value
  
  // Ensure we keep the plus sign at the start if it exists
  if (value.startsWith('+')) {
    const digits = value.slice(1).replace(/[^\d\s()-]/g, '')
    value = '+' + digits
  } else {
    // For numbers without plus, preserve leading zeros and only clean non-digit chars
    value = value.replace(/[^\d\s()-]/g, '')
  }
  
  try {
    // Format the number using libphonenumber-js
    const phoneNumber = parsePhoneNumber(value, { defaultCountry: props.country })
    if (phoneNumber?.isValid()) {
      const formattedNumber = phoneNumber.format('INTERNATIONAL')
      emit('update:modelValue', formattedNumber)
    } else {
      // If parsing fails or number is invalid, use AsYouType formatter for partial numbers
      const formatter = new AsYouType(props.country)
      const formattedNumber = formatter.input(value)
      emit('update:modelValue', formattedNumber)
    }
  } catch (error) {
    // If there's an error, at least emit the cleaned value
    emit('update:modelValue', value)
    console.error('Phone formatting error:', error)
  }
}

// Expose validation state to parent component
defineExpose({
  isValid
})
</script>

<style scoped>
input:focus {
  outline: none;
  border-color: #d1d5db;
}

input:focus.border-green-500 {
  border-color: #22c55e;
}

input:focus.border-red-500 {
  border-color: #ef4444;
}
</style> 