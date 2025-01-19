import type { Carrier } from '~/types/shipping'

const econtOffices = {
  id: 'econt',
  name: 'Econt Express',
  type: 'office',
  locations: [
    {
      id: 'econt-sf1',
      name: 'София - Център',
      address: 'ул. Витоша 89',
      city: 'София',
      province: 'SF',
      zip: '1000'
    },
    {
      id: 'econt-sf2',
      name: 'София - Младост',
      address: 'бул. Александър Малинов 51',
      city: 'София',
      province: 'SF',
      zip: '1729'
    }
    // Add more Econt offices
  ]
}   satisfies Carrier

export default econtOffices 