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
