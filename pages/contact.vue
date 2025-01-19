<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold mb-8 text-center">Contact Us</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- Left Column - Contact Information -->
      <div class="space-y-6">
        <h2 class="text-2xl font-semibold mb-4">Get in Touch</h2>
        
        <div class="space-y-4">
          <div class="flex items-start space-x-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <div>
              <h3 class="font-semibold">Email</h3>
              <p class="text-gray-600">support@wanderheat.com</p>
            </div>
          </div>
          
          <div class="flex items-start space-x-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <h3 class="font-semibold">Address</h3>
              <p class="text-gray-600">123 WanderHeat Street<br />Heat City, HC 12345</p>
            </div>
          </div>
          
          <div class="flex items-start space-x-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 class="font-semibold">Hours of Operation</h3>
              <p class="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Right Column - Contact Form -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-semibold mb-6">Send us a Message</h2>
        
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              :class="{ 'border-red-500': errors.name }"
            />
            <p v-if="errors.name" class="mt-1 text-sm text-red-500">{{ errors.name }}</p>
          </div>
          
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              :class="{ 'border-red-500': errors.email }"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
          </div>
          
          <div>
            <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              id="subject"
              v-model="formData.subject"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              :class="{ 'border-red-500': errors.subject }"
            />
            <p v-if="errors.subject" class="mt-1 text-sm text-red-500">{{ errors.subject }}</p>
          </div>
          
          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              id="message"
              v-model="formData.message"
              rows="4"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              :class="{ 'border-red-500': errors.message }"
            ></textarea>
            <p v-if="errors.message" class="mt-1 text-sm text-red-500">{{ errors.message }}</p>
          </div>
          
          <button
            type="submit"
            class="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-200"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Sending...' : 'Send Message' }}
          </button>
          
          <!-- Success/Error Messages -->
          <div v-if="submitStatus" class="mt-4 p-4 rounded-md" :class="submitStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
            {{ submitStatus.message }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface Errors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

interface SubmitStatus {
  type: 'success' | 'error'
  message: string
}

const formData = reactive<FormData>({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const errors = reactive<Errors>({})
const isSubmitting = ref(false)
const submitStatus = ref<SubmitStatus | null>(null)

const validateForm = (): boolean => {
  errors.name = !formData.name ? 'Name is required' : ''
  errors.email = !formData.email ? 'Email is required' : ''
  errors.subject = !formData.subject ? 'Subject is required' : ''
  errors.message = !formData.message ? 'Message is required' : ''
  
  return !Object.values(errors).some(error => error)
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  submitStatus.value = null
  
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    
    const data = await response.json()
    
    if (response.ok) {
      submitStatus.value = {
        type: 'success',
        message: 'Message sent successfully! We will get back to you soon.'
      }
      // Reset form
      Object.keys(formData).forEach(key => {
        formData[key as keyof FormData] = ''
      })
    } else {
      throw new Error(data.message || 'Failed to send message')
    }
  } catch (error) {
    submitStatus.value = {
      type: 'error',
      message: error instanceof Error ? error.message : 'An error occurred while sending your message'
    }
  } finally {
    isSubmitting.value = false
  }
}
</script> 