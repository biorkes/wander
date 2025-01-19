import type { Carrier } from '~/types/shipping'

const speedyOffices = {
  id: 'speedy',
  name: 'Speedy Offices',
  type: 'office',
  locations: [
    {
      id: 'speedy-sf1',
      name: 'София - Люлин',
      address: 'бул. Царица Йоанна 15',
      city: 'София',
      province: 'SF',
      zip: '1324'
    },
    {
      id: 'speedy-sf2',
      name: 'София - Дружба',
      address: 'ул. Капитан Димитър Списаревски 3',
      city: 'София',
      province: 'SF',
      zip: '1582'
    }
    // Add more Speedy offices
  ]
} satisfies Carrier

export default speedyOffices 