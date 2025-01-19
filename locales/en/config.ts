export default {
  locale: 'en',
  currency: 'EUR',
  currencySymbol: '€',
  currencyPosition: 'prefix' as const,
  delivery_tax: 3.90,
  provinces: [],
  shipping_methods: {
    door: {
      id: 'door',
      name: 'Door Delivery'
    }
  },
  packages: {
    basic: {
      name: 'Basic Package',
      regularPrice: 47.90,
      image: '/images/product1.webp',
      items: [
        {
            sku: 'WH-HEATER-01',
            name: 'Basic Heater',
            qty: 1,
            price: 29.60
        }
        // {
        //   sku: 'WH-FILTER-01',
        //   name: 'Standard Filter',
        //   qty: 2,
        //   price: 4.99
        // }
      ]
    },
    standard: {
      name: 'Standard Package',
      regularPrice: 95.80,
      image: '/images/product2.webp',
      badge: 'badge.bestSeller',
      items: [
        {
            sku: 'WH-HEATER-02',
            name: 'Enhanced Heater',
            qty: 2,
            price: 54.40
        }
      ]
    },
    extra: {
      name: 'Extra Package',
      regularPrice: 143.70,
      image: '/images/product3.webp',
      items: [
        {
            sku: 'WH-HEATER-02',
            name: 'Enhanced Heater',
            qty: 3,
            price: 78.30
        }
      ]
    },
    platinum: {
      name: 'Platinum Package',
      regularPrice: 191.60,
      image: '/images/product4+1.webp',
      items: [
        {
            sku: 'WH-HEATER-02',
            name: 'Enhanced Heater',
            qty: 4,
            price: 118.40
        },
        {
            sku: 'WH-HEATER-02',
            name: 'Enhanced Heater',
            qty: 1,
            price: 0
        }
      ]
    },
    // ... other packages
  }
} 