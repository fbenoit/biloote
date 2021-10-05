import { Document } from 'bson'
import { Vehicle } from '../../domain/Types/Vehicle'

export default class VehicleMapper {
  public static fromDocument(document: Document): Vehicle {
    return {
      id: document._id.toString(),
      name: document.name,
      type: document.type,
    }
  }
}
