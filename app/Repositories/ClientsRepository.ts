import { Collection, ObjectId } from 'mongodb'
import { Client } from '../../domain/Types/Client'
import { MongoProvider } from '../../providers/MongoProvider'
import ClientMapper from '../Mappers/ClientMapper'

export default class ClientsRepository {
  private clientsCollection: Collection

  constructor() {
    this.clientsCollection = MongoProvider.getCollection('clients')
  }

  public async getById(id: string): Promise<Client | null> {
    const documentResult = await this.clientsCollection.findOne({ _id: new ObjectId(id) })
    return documentResult && ClientMapper.fromDocument(documentResult)
  }

  public async getClients(): Promise<Client[]> {
    const documentsResult = await this.clientsCollection.find().toArray()
    return documentsResult.map(ClientMapper.fromDocument)
  }
}
