<template>
  <div class="flex items-center gap-2">
    <input 
      type="checkbox"
      :id="id"
      :checked="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      class="rounded border-gray-300 text-red-500 focus:ring-red-500"
      :class="{ 'border-red-500': error }"
    />
    <label :for="id" class="text-sm text-gray-600">
      {{ label }}
    </label>
    <span v-if="error" class="text-red-500 text-xs">
      {{ error }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
  id: string
  label?: string
  error?: string
}>()

defineEmits<{
  'update:modelValue': [value: boolean]
}>()

defineExpose({})
</script> 