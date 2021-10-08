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

it('fails when startDate >= endDate', () => {
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
    startDate: new Date('2021-01-02'),
    endDate: new Date('2021-01-02'),
  })

  expect(validationErrors).toContainEqual('startDate must be < endDate')
})

describe('rentals duration', () => {
  it('fails when duration < 24h', () => {
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
      startDate: new Date('2021-01-02Z10:00:00'),
      endDate: new Date('2021-01-02Z20:00:00'),
    })

    expect(validationErrors).toContainEqual('rentals must be 1d minimum')
  })
  it('fails when duration > 7d', () => {
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

    expect(validationErrors).toContainEqual('rentals must be 7d maximum')
  })
})
