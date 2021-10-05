import { Collection } from 'mongodb'
import { Rental } from '../../domain/types/rental'
import { MongoProvider } from '../../providers/MongoProvider'
import RentalMapper from '../Mappers/RentalMapper'

export default class RentalsRepository {
  private rentalsCollection: Collection

  constructor() {
    this.rentalsCollection = MongoProvider.getCollection('rentals')
  }

  public async create(rental: Rental) {
    await this.rentalsCollection.insertOne(rental)
  }

  public async getRentals(): Promise<Rental[]> {
    const documentsResult = await this.rentalsCollection.find().toArray()
    return documentsResult.map(RentalMapper.fromDocument)
  }
}
