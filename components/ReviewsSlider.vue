<template>
  <div class="relative">
    <!-- Navigation Buttons -->
    <button 
      @click="prevSlide" 
      class="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 -ml-4"
    >
      <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    
    <button 
      @click="nextSlide" 
      class="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 -mr-4"
    >
      <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <!-- Reviews Slider -->
    <div class="overflow-hidden">
      <div 
        class="flex transition-transform duration-500 ease-in-out"
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <div 
          v-for="(review, index) in reviews" 
          :key="index"
          class="w-full flex-shrink-0 px-4"
        >
          <div class="bg-white rounded-lg shadow-lg p-6 mx-auto max-w-2xl">
            <div class="flex items-center mb-4">
              <div class="flex-shrink-0">
                <img 
                  :src="review.avatar" 
                  :alt="review.name"
                  class="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div class="ml-4">
                <h4 class="font-semibold">{{ review.name }}</h4>
                <div class="flex items-center">
                  <div class="flex text-yellow-400">
                    <svg v-for="star in 5" :key="star" class="w-4 h-4" :class="{ 'text-gray-300': star > review.rating }" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span class="text-gray-500 text-sm ml-2">{{ review.date }}</span>
                </div>
              </div>
            </div>
            <p class="text-gray-600">{{ review.text }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Dots Navigation -->
    <div class="flex justify-center mt-6 space-x-2">
      <button 
        v-for="(_, index) in reviews" 
        :key="index"
        @click="goToSlide(index)"
        class="w-2 h-2 rounded-full transition-colors duration-200"
        :class="currentSlide === index ? 'bg-red-500' : 'bg-gray-300'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const reviews = [
  {
    name: "Sarah Johnson",
    rating: 5,
    date: "2 weeks ago",
    text: "This heater is amazing! It heats up my room in minutes and the energy savings are noticeable. Highly recommend!",
    avatar: "/images/reviews/avatar1.webp"
  },
  {
    name: "Michael Chen",
    rating: 5,
    date: "1 month ago",
    text: "Perfect for my home office. I love how portable it is and the digital controls are very intuitive.",
    avatar: "/images/reviews/avatar2.webp"
  },
  {
    name: "Emma Wilson",
    rating: 4,
    date: "3 weeks ago",
    text: "Great little heater for my kids' rooms. The safety features give me peace of mind.",
    avatar: "/images/reviews/avatar3.webp"
  }
]

const currentSlide = ref(0)

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % reviews.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + reviews.length) % reviews.length
}

const goToSlide = (index: number) => {
  currentSlide.value = index
}

// Auto-advance slides
let autoplayInterval: NodeJS.Timeout

onMounted(() => {
  autoplayInterval = setInterval(nextSlide, 5000)
})

onUnmounted(() => {
  clearInterval(autoplayInterval)
})
</script> 