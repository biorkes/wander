import type { Coupon } from '../../types/coupons'

const coupons: Record<string, Coupon> = {
  'WELCOME10': {
    type: 'percent',
    value: 10,
    validFrom: '2024-01-01T00:00:00Z',
    validTo: '2024-12-31T23:59:59Z'
  },
  'PROMO20': {
    type: 'percent',
    value: 20,
    validFrom: '2024-03-01T00:00:00Z',
    validTo: '2024-06-30T23:59:59Z'
  },
  'SPRING15': {
    type: 'fixed',
    value: 15,
    validFrom: '2024-03-01T00:00:00Z',
    validTo: '2024-05-31T23:59:59Z'
  }
}

export default coupons 