export default {
  locale: 'es',
  currency: 'EUR',
  currencySymbol: '€',
  currencyPosition: 'prefix' as const,
  delivery_tax: 7.99,
  shipping_methods: {
    door: {
      id: 'door',
      name: 'A domicilio'
    }
  },
  provinces: [
    { code: 'ES-A', name: 'Alicante' },
    { code: 'ES-AB', name: 'Albacete' },
    { code: 'ES-AL', name: 'Almería' },
    { code: 'ES-AV', name: 'Ávila' },
    { code: 'ES-B', name: 'Barcelona' },
    { code: 'ES-BA', name: 'Badajoz' },
    { code: 'ES-BI', name: 'Vizcaya' },
    { code: 'ES-BU', name: 'Burgos' },
    { code: 'ES-C', name: 'A Coruña' },
    { code: 'ES-CA', name: 'Cádiz' },
    { code: 'ES-CC', name: 'Cáceres' },
    { code: 'ES-CO', name: 'Córdoba' },
    { code: 'ES-CR', name: 'Ciudad Real' },
    { code: 'ES-CS', name: 'Castellón' },
    { code: 'ES-CU', name: 'Cuenca' },
    { code: 'ES-GC', name: 'Las Palmas' },
    { code: 'ES-GI', name: 'Girona' },
    { code: 'ES-GR', name: 'Granada' },
    { code: 'ES-GU', name: 'Guadalajara' },
    { code: 'ES-H', name: 'Huelva' },
    { code: 'ES-HU', name: 'Huesca' },
    { code: 'ES-J', name: 'Jaén' },
    { code: 'ES-L', name: 'Lleida' },
    { code: 'ES-LE', name: 'León' },
    { code: 'ES-LO', name: 'La Rioja' },
    { code: 'ES-LU', name: 'Lugo' },
    { code: 'ES-M', name: 'Madrid' },
    { code: 'ES-MA', name: 'Málaga' },
    { code: 'ES-MU', name: 'Murcia' },
    { code: 'ES-NA', name: 'Navarra' },
    { code: 'ES-O', name: 'Asturias' },
    { code: 'ES-OR', name: 'Ourense' },
    { code: 'ES-P', name: 'Palencia' },
    { code: 'ES-PM', name: 'Baleares' },
    { code: 'ES-PO', name: 'Pontevedra' },
    { code: 'ES-S', name: 'Cantabria' },
    { code: 'ES-SA', name: 'Salamanca' },
    { code: 'ES-SE', name: 'Sevilla' },
    { code: 'ES-SG', name: 'Segovia' },
    { code: 'ES-SO', name: 'Soria' },
    { code: 'ES-SS', name: 'Guipúzcoa' },
    { code: 'ES-T', name: 'Tarragona' },
    { code: 'ES-TE', name: 'Teruel' },
    { code: 'ES-TF', name: 'Santa Cruz de Tenerife' },
    { code: 'ES-TO', name: 'Toledo' },
    { code: 'ES-V', name: 'Valencia' },
    { code: 'ES-VA', name: 'Valladolid' },
    { code: 'ES-VI', name: 'Álava' },
    { code: 'ES-Z', name: 'Zaragoza' },
    { code: 'ES-ZA', name: 'Zamora' }
  ],
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