import { ClientLicence } from '../Types/Client'
import RentalCreationValidator from './RentalCreationValidator'

it('validates when there is no current or upcoming rental', () => {
  const validationErrors = RentalCreationValidator.validate([], {
    vehicle: {
      id: '1',
      name: 'aName',
      type: 'bicycle',
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
      type: 'bicycle',
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
        type: 'bicycle',
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
        type: 'bicycle',
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

describe('driver licence check for rentals', () => {
  it('requires A driver licence for motorbikes with CC power greater than 125cc', () => {
    const validationErrors = RentalCreationValidator.validate([], {
      vehicle: {
        id: '1',
        name: 'aName',
        type: 'motorbike',
        ccPower: 500,
      },
      client: {
        id: '1',
        firstName: 'aFirstName',
        lastName: 'aLastName',
        licence: ClientLicence.B,
      },
      startDate: new Date('2021-01-01'),
      endDate: new Date('2021-01-03'),
    })

    expect(validationErrors).toContainEqual('client must have a A driver licence')
  })

  it('requires a driver licence for motorbikes & scooters with CC power lower or equal than 125cc', () => {
    const validationErrors = RentalCreationValidator.validate([], {
      vehicle: {
        id: '1',
        name: 'aName',
        type: 'scooter',
        ccPower: 125,
      },
      client: {
        id: '1',
        firstName: 'aFirstName',
        lastName: 'aLastName',
      },
      startDate: new Date('2021-01-01'),
      endDate: new Date('2021-01-03'),
    })

    expect(validationErrors).toContainEqual('client must have a driver licence')
  })
})
