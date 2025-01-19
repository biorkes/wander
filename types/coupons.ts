export interface Coupon {
  type: 'fixed' | 'percent'
  value: number
  validFrom: string // ISO date string
  validTo: string // ISO date string
} 