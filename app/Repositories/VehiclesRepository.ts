import { Collection, ObjectId } from 'mongodb'
import { Vehicle, VehicleType } from '../../domain/Types/Vehicle'
import { MongoProvider } from '../../providers/MongoProvider'
import VehicleMapper from '../Mappers/VehicleMapper'

export default class VehiclesRepository {
  public vehiclesCollection: Collection

  constructor() {
    this.vehiclesCollection = MongoProvider.getCollection('vehicles')
  }

  public async getById(id: string): Promise<Vehicle | null> {
    const documentResult = await this.vehiclesCollection.findOne({ _id: new ObjectId(id) })
    return documentResult && VehicleMapper.fromDocument(documentResult)
  }

  public async getByVehicleType(vehicleType: VehicleType): Promise<Vehicle[]> {
    const documents = await this.vehiclesCollection.find({ type: vehicleType }).toArray()
    return documents.map(VehicleMapper.fromDocument)
  }
}
