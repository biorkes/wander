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
  type: 'office' | 'locker'
  locations: Location[]
}

export type DoorDelivery = {
  id: 'door'
  name: string
}

export type ShippingMethods = {
  door: DoorDelivery
  [key: string]: DoorDelivery | Carrier
}

// Example usage in config:
export type CountryConfig = {
  locale: string
  currency: string
  currencySymbol: string
  currencyPosition: 'prefix' | 'suffix'
  delivery_tax: number
  shipping_methods: ShippingMethods
  provinces: Array<{
    code: string
    name: string
  }>
  packages: {
    [key: string]: {
      name: string
      regularPrice: number
      image: string
      badge?: string
      items: Array<{
        sku: string
        name: string
        qty: number
        price: number
      }>
    }
  }
} 