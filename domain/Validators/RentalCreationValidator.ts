import { Rental } from '../Types/Rental'

export default class RentalCreationValidator {
  public static validate(
    _currentAndUpcomingRentals: Rental[],
    _rentalToCreate: Rental
  ): ValidationError[] {
    return ['rental duration must be 24h minimum']
  }
}

export type ValidationError = string
