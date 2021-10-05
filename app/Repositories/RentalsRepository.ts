import { Collection } from 'mongodb'
import { Rental } from '../../domain/types/rental'
import { MongoProvider } from '../../providers/MongoProvider'

export default class RentalsRepository {
  private rentalsCollection: Collection

  constructor() {
    this.rentalsCollection = MongoProvider.getCollection('rentals')
  }

  public async create(rental: Rental) {
    await this.rentalsCollection.insertOne(rental)
  }
}
