<template>
  <button
    :class="[
      'font-bold py-3 px-8 rounded-lg transition',
      variant === 'primary' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-700 hover:bg-gray-800 text-white'
    ]"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary'
  }
})
</script> 