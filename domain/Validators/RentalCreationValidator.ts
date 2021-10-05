import { Rental } from '../Types/Rental'

export default class RentalCreationValidator {
  public static validate(
    _currentAndUpcomingRentals: Rental[],
    _rentalToCreate: Rental
  ): ValidationError[] {
    return []
  }
}

export type ValidationError = string
