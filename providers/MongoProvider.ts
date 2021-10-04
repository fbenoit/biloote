import { Db, MongoClient } from 'mongodb'

let client: MongoClient
let database: Db

export async function connectDatabase() {
  client = new MongoClient('mongodb://mongo:27017')
  await client.connect()
  database = client.db('biloot')
}

export function getDatabase(): Db {
  return database
}

export async function closeDatabase() {
  await client.close()
}

export async function seed() {
  const clientsCollection = database.collection('clients')
  const vehiclesCollection = database.collection('vehicles')
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
