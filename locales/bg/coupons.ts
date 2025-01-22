import type { CouponConfig } from '../../types/coupons'

const coupons: CouponConfig = {
  'WELCOME10': {
    type: 'percent',
    value: 10,
    validFrom: '2024-01-01',
    validTo: '2025-12-31',
    code: 'WELCOME10'
  },
  'PROMO20': {
    type: 'percent',
    value: 20,
    validFrom: '2024-03-01',
    validTo: '2025-06-30',
    code: 'PROMO20'
  },
  'SPRING15': {
    type: 'fixed',
    value: 15,
    validFrom: '2024-01-01',
    validTo: '2024-12-31',
    code: 'SPRING15'
  },
  'SUMMER20': {
    type: 'percent',
    value: 20,
    validFrom: '2024-01-01',
    validTo: '2025-12-31',
    code: 'SUMMER20'
  },
  'FREESHIP': {
    type: 'free_shipping',
    value: 0,
    validFrom: '2024-01-01',
    validTo: '2025-12-31',
    code: 'FREESHIP'
  }
}

export default coupons 