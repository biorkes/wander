export interface PackageItem {
  id: string
  sku: string
  name: string
  qty: number
  price: number
}

export interface Package {
  id: string
  name: string
  description?: string
  image: string
  badge?: string
  items: PackageItem[]
  shipping: number
  regularPrice: number
  isDefault?: boolean
  freeDeliveryBadge?: boolean
}

export type PackageConfig = Record<string, Package> 