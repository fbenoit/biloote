import { Db, MongoClient } from 'mongodb'

export class MongoProvider {
  private static client: MongoClient
  private static database: Db

  public static async connect() {
    this.client = new MongoClient('mongodb://mongo:27017')
    await this.client.connect()
    this.database = this.client.db('biloote')
  }

  public static getDatabase(): Db {
    return this.database
  }

  public static async close() {
    await this.client.close()
  }

  public static async seed() {
    const clientsCollection = this.database.collection('clients')
    const vehiclesCollection = this.database.collection('vehicles')
    const count = await clientsCollection.countDocuments()
    if (count > 0) {
      return
    }

    clientsCollection.insertMany([
      {
        firstName: 'Nicolas',
        lastName: 'Sarkozy',
        licence: 'A',
      },
      {
        firstName: 'Nicolas',
        lastName: 'Hulot',
        licence: 'B',
      },
      {
        firstName: 'Jean',
        lastName: 'Lasalle',
        licence: null,
      },
    ])

    await vehiclesCollection.insertMany([
      {
        name: 'Vélo rouge',
        type: 'bicycle',
      },
      {
        name: 'Vélo bleu',
        type: 'bicycle',
      },
      {
        name: 'Scooter rouge',
        type: 'scooter',
      },
      {
        name: 'Scooter bleu',
        type: 'scooter',
      },
      {
        name: 'Moto rouge',
        type: 'motorbike',
      },
      {
        name: 'Moto bleu',
        type: 'motorbike',
      },
    ])
  }
}
