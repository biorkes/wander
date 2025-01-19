import samedayLockers from './carriers/sameday'

export default {
  locale: 'ro',
  currency: 'RON',
  currencySymbol: 'lei',
  currencyPosition: 'suffix' as const,
  delivery_tax: 19.90,
  shipping_methods: {
    door: {
      id: 'door',
      name: 'La adresă'
    },
    sameday: samedayLockers
  },
  provinces: [
    { code: 'RO-AB', name: 'Alba' },
    { code: 'RO-AG', name: 'Argeș' },
    { code: 'RO-AR', name: 'Arad' },
    { code: 'RO-B', name: 'București' },
    { code: 'RO-BC', name: 'Bacău' },
    { code: 'RO-BH', name: 'Bihor' },
    { code: 'RO-BN', name: 'Bistrița-Năsăud' },
    { code: 'RO-BR', name: 'Brăila' },
    { code: 'RO-BT', name: 'Botoșani' },
    { code: 'RO-BV', name: 'Brașov' },
    { code: 'RO-BZ', name: 'Buzău' },
    { code: 'RO-CJ', name: 'Cluj' },
    { code: 'RO-CL', name: 'Călărași' },
    { code: 'RO-CS', name: 'Caraș-Severin' },
    { code: 'RO-CT', name: 'Constanța' },
    { code: 'RO-CV', name: 'Covasna' },
    { code: 'RO-DB', name: 'Dâmbovița' },
    { code: 'RO-DJ', name: 'Dolj' },
    { code: 'RO-GJ', name: 'Gorj' },
    { code: 'RO-GL', name: 'Galați' },
    { code: 'RO-GR', name: 'Giurgiu' },
    { code: 'RO-HD', name: 'Hunedoara' },
    { code: 'RO-HR', name: 'Harghita' },
    { code: 'RO-IF', name: 'Ilfov' },
    { code: 'RO-IL', name: 'Ialomița' },
    { code: 'RO-IS', name: 'Iași' },
    { code: 'RO-MH', name: 'Mehedinți' },
    { code: 'RO-MM', name: 'Maramureș' },
    { code: 'RO-MS', name: 'Mureș' },
    { code: 'RO-NT', name: 'Neamț' },
    { code: 'RO-OT', name: 'Olt' },
    { code: 'RO-PH', name: 'Prahova' },
    { code: 'RO-SB', name: 'Sibiu' },
    { code: 'RO-SJ', name: 'Sălaj' },
    { code: 'RO-SM', name: 'Satu Mare' },
    { code: 'RO-SV', name: 'Suceava' },
    { code: 'RO-TL', name: 'Tulcea' },
    { code: 'RO-TM', name: 'Timiș' },
    { code: 'RO-TR', name: 'Teleorman' },
    { code: 'RO-VL', name: 'Vâlcea' },
    { code: 'RO-VN', name: 'Vrancea' },
    { code: 'RO-VS', name: 'Vaslui' }
  ],
  packages: {
    basic: {
      name: 'Pachet Basic',
      regularPrice: 239.90,
      image: '/images/product1.webp',
      items: [
        {
          sku: 'WH-HEATER-01',
          name: 'Încălzitor Basic',
          qty: 1,
          price: 149.60
        }
      ]
    },
    standard: {
      name: 'Pachet Standard',
      regularPrice: 479.80,
      image: '/images/product2.webp',
      badge: 'badge.bestSeller',
      items: [
        {
          sku: 'WH-HEATER-02',
          name: 'Încălzitor Avansat',
          qty: 2,
          price: 272.40
        }
      ]
    },
    extra: {
      name: 'Pachet Extra',
      regularPrice: 719.70,
      image: '/images/product3.webp',
      items: [
        {
          sku: 'WH-HEATER-02',
          name: 'Încălzitor Avansat',
          qty: 3,
          price: 391.30
        }
      ]
    },
    platinum: {
      name: 'Pachet Platinum',
      regularPrice: 959.60,
      image: '/images/product4+1.webp',
      items: [
        {
          sku: 'WH-HEATER-02',
          name: 'Încălzitor Avansat',
          qty: 4,
          price: 592.40
        },
        {
          sku: 'WH-HEATER-02',
          name: 'Încălzitor Avansat',
          qty: 1,
          price: 0
        }
      ]
    }
  },
  offices: [
    // Romanian offices
  ]
} 