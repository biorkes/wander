import type { PackageConfig } from '~/types/packages'

const packages: PackageConfig = {
  'basic': {
    id: 'basic',
    name: 'Основен пакет',
    description: 'Идеален за начало',
    image: '/images/packages/product1.webp',
    items: [
      {
        id: 'item1',
        sku: 'WH-BASIC-1',
        name: 'Wanderheat',
        qty: 1,
        price: 29.99
      }
    ],
    shipping: 0,
    regularPrice: 50.99,
    isDefault: true,
    freeDeliveryBadge: false
  },
  'premium': {
    id: 'premium',
    name: 'Премиум пакет',
    description: 'Най-популярният избор',
    image: '/images/packages/product2.webp',
    badge: 'badge.bestSeller',
    items: [
      {
        id: 'item1',
        sku: '1023',
        name: 'Wanderheat',
        qty: 2,
        price: 46.30
      }
    ],
    shipping: 9.99,
    regularPrice: 109.99,
    freeDeliveryBadge: false
  },
  'ultra': {
    id: 'ultra',
    name: 'Ултра пакет',
    description: 'За максимално покритие',
    image: '/images/packages/product3.webp',
    badge: 'badge.bestSeller',
    items: [
      {
        id: 'item1',
        sku: '1023',
        name: 'Wanderheat',
        qty: 3,
        price: 75.60
      }
    ],
    shipping: 9.99,
    regularPrice: 149.99,
    freeDeliveryBadge: false
  }
}

export default packages 