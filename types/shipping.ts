export type Location = {
  id: string
  name: string
  address: string
  city: string
  province: string
  zip: string
}

export type CarrierType = 'office' | 'locker'

export type Carrier = {
  id: string
  name: string
  type: CarrierType
  locations: Location[]
  enabled: boolean
}

export type DoorDelivery = {
  id: 'door'
  name: string
  enabled: boolean
}

export type ShippingMethods = {
  door: DoorDelivery
  [key: string]: DoorDelivery | Carrier
}

export interface ShippingMethod {
  id: string
  name: string
  enabled: boolean
}

export interface Province {
  code: string
  name: string
}

export interface PackageItem {
  sku: string
  name: string
  qty: number
  price: number
}

export interface Package {
  name: string
  regularPrice: number
  image: string
  badge?: string
  items: PackageItem[]
  shipping: number
  freeDeliveryBadge?: boolean
}

export interface CountryConfig {
  locale: string
  currency: string
  currencySymbol: string
  currencyPosition: 'prefix' | 'suffix'
  delivery_tax: number
  shipping_methods: ShippingMethods
  provinces: Province[]
  packages: {
    [key: string]: Package
  }
} 