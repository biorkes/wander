export interface Coupon {
  type: 'fixed' | 'percent' | 'free_shipping'
  value: number
  validFrom: string // ISO date string
  validTo: string // ISO date string
  code: string
}

export type CouponConfig = Record<string, Coupon> 