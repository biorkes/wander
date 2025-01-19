import { ref, computed } from 'vue'
import type { AccessoriesResponse, AccessoryProduct } from '~/types/accessories'
import { getAllowedAccessories, transformAccessory } from '~/types/accessories'

export const useAccessories = () => {
  const accessories = ref<AccessoryProduct[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const config = useRuntimeConfig()

  const fetchAccessories = async (locale: string) => {
    loading.value = true
    error.value = null
    console.log('Fetching accessories for locale:', locale)

    try {
      // Get the list of allowed accessories for this locale
      const allowedKeys = getAllowedAccessories(locale)
      console.log('Allowed accessories:', allowedKeys)
      
      if (!allowedKeys.length) {
        console.log('No allowed accessories found for locale')
        accessories.value = []
        return
      }

      // Check if API URL is configured
      const apiUrl = config.public.accessoriesApiUrl
      console.log('Accessories API URL:', apiUrl)
      
      if (!apiUrl) {
        throw new Error('Accessories API URL is not configured')
      }

      // Fetch accessories data from API
      console.log('Fetching from API...')
      const response = await fetch(apiUrl)
      if (!response.ok) {
        throw new Error(`Failed to fetch accessories: ${response.statusText}`)
      }

      const data: AccessoriesResponse = await response.json()
      console.log('API response data:', data)

      // Filter and transform accessories for current locale
      accessories.value = Object.entries(data)
        .filter(([key]) => allowedKeys.includes(key))
        .map(([key, accessory]) => transformAccessory(key, accessory, locale))
        .filter(product => product.inStock) // Only show in-stock items
      
      console.log('Processed accessories:', accessories.value)

    } catch (err) {
      console.error('Error fetching accessories:', err)
      error.value = err instanceof Error ? err.message : 'Failed to load accessories'
      accessories.value = []
    } finally {
      loading.value = false
    }
  }

  // Computed properties for UI state
  const hasAccessories = computed(() => accessories.value.length > 0)
  const isLoading = computed(() => loading.value)
  const hasError = computed(() => error.value !== null)

  return {
    accessories,
    loading,
    error,
    fetchAccessories,
    hasAccessories,
    isLoading,
    hasError
  }
} 