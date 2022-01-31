import { Rental } from '../Types/Rental'

export default class RentalCreationValidator {
  public static validate(
    _currentAndUpcomingRentals: Rental[],
    rentalToCreate: Rental
  ): ValidationError[] {
    let validationErrors: string[] = []

    const startDate = rentalToCreate.startDate
    const endDate = rentalToCreate.endDate

    if (endDate.getTime() - startDate.getTime() < 24 * 60 * 60 * 1000) {
      validationErrors.push('rental duration must be 24h minimum')
    }

    if (endDate.getTime() - startDate.getTime() > 7 * 24 * 60 * 60 * 1000) {
      validationErrors.push('rental duration must be 7d maximum')
    }

    return validationErrors
  }
}

export type ValidationError = string
