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

  expect(validationErrors).toStrictEqual(['start date must be superior than end date'])
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
