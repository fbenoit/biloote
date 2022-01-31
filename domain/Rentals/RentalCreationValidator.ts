import { Rental } from '../Types/Rental'

export default class RentalCreationValidator {
  public static validate(rentalToCreate: Rental): ValidationError[] {
    let validationErrors: string[] = []

    if (rentalToCreate.startDate >= rentalToCreate.endDate) {
      validationErrors = [...validationErrors, 'start date must be superior than end date']
    }

    if (
      rentalToCreate.endDate.getTime() - rentalToCreate.startDate.getTime() <
      24 * 60 * 60 * 1000
    ) {
      validationErrors = [...validationErrors, 'Rental must be at least one day']
    }

    if (
      rentalToCreate.endDate.getTime() - rentalToCreate.startDate.getTime() >
      7 * 24 * 60 * 60 * 1000
    ) {
      validationErrors = [...validationErrors, 'Rental must be at most seven days']
    }

    return validationErrors
  }
}

export type ValidationError = string
