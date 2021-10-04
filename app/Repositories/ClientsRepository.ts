import { Collection, Document } from 'mongodb'
import { Client } from '../../domain/types/client'
import { MongoProvider } from '../../providers/MongoProvider'

export default class ClientsRepository {
  private clientsCollection: Collection

  constructor() {
    this.clientsCollection = MongoProvider.getCollection('clients')
  }

  public async getClients(): Promise<Client[]> {
    const documentsResult = await this.clientsCollection.find().toArray()
    return documentsResult.map(this.documentToClient)
  }

  private documentToClient(document: Document): Client {
    return {
      id: document._id.toString(),
      firstName: document.firstName,
      lastName: document.lastName,
      licence: document.licence,
    }
  }
}
