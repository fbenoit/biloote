import { Document } from 'bson'
import { Client } from '../../domain/types/client'

export default class ClientMapper {
  public static fromDocument(document: Document): Client {
    return {
      id: document._id.toString(),
      firstName: document.firstName,
      lastName: document.lastName,
      licence: document.licence,
    }
  }
}
