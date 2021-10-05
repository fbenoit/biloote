import { VehicleType } from '../Types/Vehicle'
import RentalCreationValidator from './RentalCreationValidator'

it('validates when there is no current or upcoming rental', () => {
  const validationErrors = RentalCreationValidator.validate([], {
    vehicle: {
      id: '1',
      name: 'aName',
      type: VehicleType.BICYCLE,
    },
    client: {
      id: '1',
      firstName: 'aFirstName',
      lastName: 'aLastName',
    },
    startDate: new Date('2021-01-01'),
    endDate: new Date('2021-01-02'),
  })

  expect(validationErrors).toHaveLength(0)
})

it('raises error when rental duration is less than 24h', () => {
  const validationErrors = RentalCreationValidator.validate([], {
    vehicle: {
      id: '1',
      name: 'aName',
      type: VehicleType.BICYCLE,
    },
    client: {
      id: '1',
      firstName: 'aFirstName',
      lastName: 'aLastName',
    },
    startDate: new Date('2021-01-01Z10:00:00'),
    endDate: new Date('2021-01-01Z20:00:00'),
  })

  expect(validationErrors).toContainEqual('rental duration must be 24h minimum')
})

it('raises error when rental duration is more than 7d', () => {
  const validationErrors = RentalCreationValidator.validate([], {
    vehicle: {
      id: '1',
      name: 'aName',
      type: VehicleType.BICYCLE,
    },
    client: {
      id: '1',
      firstName: 'aFirstName',
      lastName: 'aLastName',
    },
    startDate: new Date('2021-01-01'),
    endDate: new Date('2021-01-10'),
  })

  expect(validationErrors).toContainEqual('rental duration must be 7d maximum')
})
