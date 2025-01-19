import { useRuntimeConfig } from '#app'

export interface AccessoryTranslations {
  [key: string]: string // locale code to translated text
}

export interface Accessory {
  image: string
  big_image: string
  name: AccessoryTranslations
  description: AccessoryTranslations
  price: {
    [key: string]: string // locale code to price
  }
  onstock: {
    [key: string]: number // locale code to stock status (0 or 1)
  }
  'sku-code': number
}

export interface AccessoriesResponse {
  [key: string]: Accessory // accessory key to accessory data
}

export interface AccessoryProduct {
  id: string
  image: string
  bigImage: string
  name: string
  description: string
  price: number
  inStock: boolean
  sku: number
}

// Helper function to get allowed accessories for current locale
export const getAllowedAccessories = (locale: string): string[] => {
  const config = useRuntimeConfig()
  const envKey = `ACCESSORIES_${locale.toUpperCase()}`
  const allowedList = String(config.public[envKey] || '')
  return allowedList.split(',').filter(Boolean)
}

// Helper function to transform API response to localized product
export const transformAccessory = (
  key: string, 
  data: Accessory, 
  locale: string
): AccessoryProduct => {
  return {
    id: key,
    image: data.image,
    bigImage: data.big_image,
    name: data.name[locale] || data.name.en || '',
    description: data.description[locale] || data.description.en || '',
    price: parseFloat(data.price[locale] || data.price.en || '0'),
    inStock: Boolean(data.onstock[locale] || data.onstock.en || 0),
    sku: data['sku-code']
  }
} 