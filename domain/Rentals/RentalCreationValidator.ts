import { Rental } from '../Types/Rental'

export default class RentalCreationValidator {
  public static validate(rentalToCreate: Rental): ValidationError[] {
    let validationErrors: string[] = []

    if (rentalToCreate.startDate >= rentalToCreate.endDate) {
      validationErrors.push('start date must be superior than end date')
    }
    console.log(rentalToCreate.endDate.getTime() - rentalToCreate.startDate.getTime())

    if (rentalToCreate.endDate.getTime() - rentalToCreate.startDate.getTime() < 24 * 60 * 60) {
      validationErrors = [...validationErrors, 'Rental must be at least one day']
    }
    return validationErrors
  }
}

export type ValidationError = string
