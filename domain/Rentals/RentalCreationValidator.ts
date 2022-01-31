import { Rental } from '../Types/Rental'

export default class RentalCreationValidator {
  public static validate(rentalToCreate: Rental): ValidationError[] {
    let validationErrors: string[] = []

    if (rentalToCreate.startDate >= rentalToCreate.endDate) {
      validationErrors.push('start date must be superior than end date')
    }

    return validationErrors
  }
}

export type ValidationError = string
