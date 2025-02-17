import type { CountryConfig } from '~/types/shipping'

const config: CountryConfig = {
  locale: 'bg',
  currency: 'BGN',
  currencySymbol: 'лв.',
  currencyPosition: 'suffix',
  delivery_tax: 19.99,
  shipping_methods: {
    door: {
      id: 'door',
      name: 'До адрес',
      enabled: true
    }
  },
  provinces: [
    { code: 'BG-01', name: 'Благоевград' },
    { code: 'BG-02', name: 'Бургас' },
    { code: 'BG-03', name: 'Варна' },
    { code: 'BG-04', name: 'Велико Търново' },
    { code: 'BG-05', name: 'Видин' },
    { code: 'BG-06', name: 'Враца' },
    { code: 'BG-07', name: 'Габрово' },
    { code: 'BG-08', name: 'Добрич' },
    { code: 'BG-09', name: 'Кърджали' },
    { code: 'BG-10', name: 'Кюстендил' },
    { code: 'BG-11', name: 'Ловеч' },
    { code: 'BG-12', name: 'Монтана' },
    { code: 'BG-13', name: 'Пазарджик' },
    { code: 'BG-14', name: 'Перник' },
    { code: 'BG-15', name: 'Плевен' },
    { code: 'BG-16', name: 'Пловдив' },
    { code: 'BG-17', name: 'Разград' },
    { code: 'BG-18', name: 'Русе' },
    { code: 'BG-19', name: 'Силистра' },
    { code: 'BG-20', name: 'Сливен' },
    { code: 'BG-21', name: 'Смолян' },
    { code: 'BG-22', name: 'София' },
    { code: 'BG-23', name: 'София (столица)' },
    { code: 'BG-24', name: 'Стара Загора' },
    { code: 'BG-25', name: 'Търговище' },
    { code: 'BG-26', name: 'Хасково' },
    { code: 'BG-27', name: 'Шумен' },
    { code: 'BG-28', name: 'Ямбол' }
  ],
  packages: {}
}

export default config 