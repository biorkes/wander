export type OrderData = {
  // Customer info
  firstName: string
  lastName: string
  phone: string
  email: string
  
  // Shipping info
  shippingMethod: string
  address: string
  city: string
  province: string
  zip: string
  country_iso: string
  selectedOffice?: string
  
  // Order details
  cart: Array<{
    sku: string
    name: string
    qty: number
    price: number
  }>
  subtotal: number
  total: number
  deliveryTax: number
  coupon?: {
    code: string
    type: 'fixed' | 'percent'
    value: number
    discountAmount: number
  }
  
  // Additional info
  channelCode: string
  paymentMethod: 'cod'
} 