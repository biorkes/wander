<template>
  <div class="min-h-screen flex flex-col">
    <nav class="bg-white shadow-md">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <NuxtLink to="/" class="flex items-center">
            <img src="~/assets/images/logo.svg" alt="WanderHeat" class="h-8" />
          </NuxtLink>
          
          <div class="space-x-4">
            <NuxtLink 
              to="/" 
              class="text-gray-600 hover:text-gray-900"
            >
              Home
            </NuxtLink>
            <NuxtLink 
              to="/contact" 
              class="text-gray-600 hover:text-gray-900"
            >
              Contact
            </NuxtLink>
            <NuxtLink 
              to="/order" 
              class="px-4 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 transition-colors"
            >
              Order Now
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <main class="flex-grow">
      <slot />
    </main>

    <footer class="bg-black text-white py-12">
      <div class="container mx-auto px-4">
        <!-- Footer Links -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li>
                <NuxtLink to="/" class="text-gray-300 hover:text-white">Home</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/contact" class="text-gray-300 hover:text-white">Contact</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/order" class="text-gray-300 hover:text-white">Order Now</NuxtLink>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold mb-4">Contact</h3>
            <ul class="space-y-2 text-gray-300">
              <li>Email: support@wanderheat.com</li>
              <li>Phone: +1 234 567 890</li>
              <li>Address: 123 WanderHeat Street</li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold mb-4">Legal</h3>
            <ul class="space-y-2">
              <li>
                <NuxtLink to="/privacy" class="text-gray-300 hover:text-white">Privacy Policy</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/terms" class="text-gray-300 hover:text-white">Terms of Service</NuxtLink>
              </li>
            </ul>
          </div>
        </div>

        <!-- Logo and Made with Love -->
        <div class="text-center border-t border-gray-800 pt-8">
          <NuxtLink to="/" class="inline-block mb-4">
            <img src="~/assets/images/logo.svg" alt="WanderHeat" class="h-8 mx-auto" />
          </NuxtLink>
          <p class="text-gray-300 mb-4">
            Made with ❤️ by WanderHeat
          </p>
          <p class="text-gray-400">
            © {{ new Date().getFullYear() }} WanderHeat. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template> 

<script setup lang="ts">
import { useLocaleStore } from '~/stores/locale'

const localeStore = useLocaleStore()

// Initialize locale on mount
onMounted(() => {
  localeStore.initializeLocale()
})
</script> 