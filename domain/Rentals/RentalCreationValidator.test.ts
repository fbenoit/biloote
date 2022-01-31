import { Rental } from '../Types/Rental'
import { VehicleType } from '../Types/Vehicle'
import RentalCreationValidator from './RentalCreationValidator'

it('fails when start date >= end date', () => {
  const rentalToCreate: Rental = {
    client: {
      id: '1',
      firstName: 'a firstname',
      lastName: 'a lastname',
    },
    startDate: new Date('2021-02-01'),
    endDate: new Date('2021-01-01'),
    vehicle: {
      id: '1',
      name: 'Moto',
      type: VehicleType.MOTORBIKE,
    },
  }
  const validationErrors = RentalCreationValidator.validate(rentalToCreate)

  expect(validationErrors).toContainEqual('start date must be superior than end date')
})

it('validates when end date > start date', () => {
  const rentalToCreate: Rental = {
    client: {
      id: '1',
      firstName: 'a firstname',
      lastName: 'a lastname',
    },
    startDate: new Date('2021-01-01'),
    endDate: new Date('2021-01-03'),
    vehicle: {
      id: '1',
      name: 'Moto',
      type: VehicleType.MOTORBIKE,
    },
  }
  const validationErrors = RentalCreationValidator.validate(rentalToCreate)

  expect(validationErrors).toStrictEqual([])
})

it('validates rental is at least one day', () => {
  const rentalToCheck: Rental = {
    client: {
      firstName: 'François',
      id: 'UIID',
      lastName: 'Hollande',
    },
    vehicle: {
      id: 'VUUID',
      name: 'Road Force One',
      type: VehicleType.SCOOTER,
    },
    startDate: new Date('2022-01-01'),
    endDate: new Date('2022-01-02'),
  }
  const validationErrors = RentalCreationValidator.validate(rentalToCheck)
  expect(validationErrors).toHaveLength(0)
})

it('fails rental is less than one day', () => {
  const rentalToCheck: Rental = {
    client: {
      firstName: 'François',
      id: 'UIID',
      lastName: 'Hollande',
    },
    vehicle: {
      id: 'VUUID',
      name: 'Road Force One',
      type: VehicleType.SCOOTER,
    },
    startDate: new Date('2022-01-01 00:00:00'),
    endDate: new Date('2022-01-01 14:00:00'),
  }
  const validationErrors = RentalCreationValidator.validate(rentalToCheck)
  expect(validationErrors).toContainEqual('Rental must be at least one day')
})
