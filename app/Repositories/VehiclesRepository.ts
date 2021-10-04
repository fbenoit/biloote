import { Collection, Document } from 'mongodb'
import { Vehicle, VehicleType } from '../../domain/types/vehicle'
import { MongoProvider } from '../../providers/MongoProvider'

export default class VehiclesRepository {
  public vehiclesCollection: Collection

  constructor() {
    this.vehiclesCollection = MongoProvider.getCollection('vehicles')
  }

  public async getByVehicleType(vehicleType: VehicleType): Promise<Vehicle[]> {
    const documents = await this.vehiclesCollection.find({ type: vehicleType }).toArray()
    return documents.map(this.documentToVehicle)
  }

  private documentToVehicle(document: Document): Vehicle {
    return {
      id: document._id.toString(),
      name: document.name,
      type: document.type,
    }
  }
}
