<template>
  <div>
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>
    <input 
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :type="type"
      :placeholder="placeholder"
      class="w-full rounded-md border border-gray-300 p-2 transition-colors duration-200"
      :class="{ 
        'border-red-500 focus:border-red-500': error,
        'border-green-500 focus:border-green-500': isValid && modelValue,
        'focus:border-gray-400': !error && (!isValid || !modelValue)
      }"
    />
    <span v-if="error" class="text-red-500 text-xs mt-1">
      {{ error }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  label?: string
  error?: string
  type?: string
  placeholder?: string
  isValid?: boolean
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<style scoped>
input:focus {
  outline: none;
}
</style> 