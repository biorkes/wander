<template>
  <section class="bg-gray-900 text-white py-20">
    <div class="container mx-auto px-6 text-center">
      <h1 class="text-5xl font-bold mb-6">
        {{ title }}
      </h1>
      <p class="text-xl mb-12">
        {{ description }}
      </p>
      <div class="space-x-4">
        <CommonButton variant="primary">Get Started</CommonButton>
        <CommonButton variant="secondary">Learn More</CommonButton>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Welcome to Your Project'
  },
  description: {
    type: String,
    default: 'A powerful solution for your needs with amazing features'
  }
})
</script> 