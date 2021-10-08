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

    if (
      rentalToCreate.vehicle.type === 'motorbike' &&
      rentalToCreate.vehicle.ccPower > 125 &&
      rentalToCreate.client.licence !== 'A'
    ) {
      validationErrors.push('client must have a A driver licence')
    }

    if (
      (rentalToCreate.vehicle.type === 'scooter' || rentalToCreate.vehicle.type === 'motorbike') &&
      rentalToCreate.vehicle.ccPower <= 125 &&
      rentalToCreate.client.licence === undefined
    ) {
      validationErrors.push('client must have a driver licence')
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
