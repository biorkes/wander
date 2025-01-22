import type { Carrier } from '~/types/shipping'

const samedayLockers: Carrier = {
  id: 'sameday',
  name: 'Sameday',
  enabled: true,
  type: 'locker',
  locations: [
    {
      id: 'sameday-sf1',
      name: 'Locker Mall Paradise',
      address: 'бул. Черни връх 100',
      city: 'София',
      province: 'SF',
      zip: '1407'
    }
    // Add more Sameday lockers
  ]
}

export default samedayLockers 