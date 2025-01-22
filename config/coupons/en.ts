import type { CouponConfig } from '~/types/coupons'

const coupons: CouponConfig = {
  'WELCOME10': {
    type: 'percent',
    value: 10,
    validFrom: '2024-01-01T00:00:00Z',
    validTo: '2024-12-31T23:59:59Z'
  },
  'SUMMER25': {
    type: 'percent',
    value: 25,
    validFrom: '2024-06-01T00:00:00Z',
    validTo: '2024-08-31T23:59:59Z'
  },
  'SAVE20': {
    type: 'fixed',
    value: 20,
    validFrom: '2024-03-01T00:00:00Z',
    validTo: '2024-05-31T23:59:59Z'
  }
}

export default coupons 