import { Rental } from '../Types/Rental'

export default class RentalCreationValidator {
  public static validate(
    _currentAndUpcomingRentals: Rental[],
    rentalToCreate: Rental
  ): ValidationError[] {
    let validationErrors: string[] = []

    const { startDate, endDate } = rentalToCreate

    if (!this.endDateIsAfterStartDate(startDate, endDate)) {
      validationErrors.push('startDate must be < endDate')
    }

    if (this.isLessThan24Hours(startDate, endDate)) {
      validationErrors.push('rentals must be 1d minimum')
    }

    if (endDate.getTime() - startDate.getTime() > 7 * 24 * 60 * 60 * 1000) {
      validationErrors.push('rentals must be 7d maximum')
    }

    return validationErrors
  }

  private static isLessThan24Hours(startDate: Date, endDate: Date): boolean {
    return endDate.getTime() - startDate.getTime() < 24 * 60 * 60 * 1000
  }

  private static endDateIsAfterStartDate(startDate: Date, endDate: Date): boolean {
    return endDate > startDate
  }
}

export type ValidationError = string
