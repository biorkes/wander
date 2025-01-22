<template>
  <section class="relative bg-gradient-to-b from-orange-50 via-white to-white py-20 overflow-hidden">
    <!-- Decorative Background Elements -->
    <div class="absolute inset-0 pointer-events-none">
      <!-- Warm Red Glow -->
      <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-red-500/20 via-orange-400/10 to-transparent rounded-full blur-3xl transform rotate-12"></div>
      <!-- Orange Heat Wave -->
      <div class="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-orange-500/20 via-red-400/10 to-transparent rounded-full blur-3xl transform -rotate-12"></div>
      <!-- Center Warmth -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] bg-gradient-to-r from-red-300/10 via-orange-300/20 to-red-300/10 rounded-full blur-3xl"></div>
    </div>

    <div class="container mx-auto px-6 max-w-6xl relative">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <!-- Product Image - Order 1 on mobile, 2 on desktop -->
        <div class="relative md:order-2">
          <!-- Background Effect -->
          <div class="absolute inset-0 bg-gradient-to-r from-red-100 to-orange-50 rounded-full blur-3xl opacity-30 transform scale-150"></div>
          
          <!-- Product Image -->
          <div class="relative transform hover:scale-105 transition-transform duration-500">
            <!-- <video 
              src="/images/product-hero-video.webm" 
              autoplay
              muted
              playsinline
              class="w-full h-auto rounded-lg"
              poster="/images/product-hero.webp"
            > -->
              <img 
                src="/images/product-hero.webp" 
                alt="WanderHeat Portable Heater"
                class="w-full h-auto rounded-lg"
              />
            <!-- </video> -->
            <!-- Floating Elements -->
            <div class="absolute -top-4 -right-4 flex flex-col gap-2">
              <!-- Power Badge -->
              <div class="bg-red-500 text-white rounded-full px-4 py-2 shadow-lg">
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span class="font-bold whitespace-nowrap">500W</span>
                </div>
              </div>
              <!-- Time Badge -->
              <div class="bg-white text-red-500 rounded-full px-4 py-2 shadow-lg">
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="font-bold whitespace-nowrap">3-5 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Text Content - Order 2 on mobile, 1 on desktop -->
        <div class="space-y-8 w-full md:max-w-xl md:order-1">
          <h1 class="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            GЕТ WARM
            <span class="text-red-500">Instantly!</span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-600 leading-relaxed">
            Heat Your Home Fast and Effectively with This Portable Plug-In Device!
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <NuxtLink 
              to="/order" 
              class="inline-flex items-center justify-center bg-red-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-600 transition-colors duration-200"
            >
              Order Now
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </NuxtLink>
            <div class="flex items-center gap-2 text-gray-600">
              <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="font-semibold">Save 30% Today!</span>
            </div>
          </div>
          <!-- Key Features -->
          <div class="grid grid-cols-2 gap-4 pt-4">
            <div class="flex items-center gap-3 p-4 rounded-lg">
              <div class="flex-shrink-0">
                <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-lg">Instant Heat</span>
            </div>
            <div class="flex items-center gap-3 p-4 rounded-lg">
              <div class="flex-shrink-0">
                <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-lg">Energy Efficient</span>
            </div>
            <div class="flex items-center gap-3 p-4 rounded-lg">
              <div class="flex-shrink-0">
                <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-lg">Portable Design</span>
            </div>
            <div class="flex items-center gap-3 p-4 rounded-lg">
              <div class="flex-shrink-0">
                <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-lg">Safe to Use</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No additional script needed for now
</script> 