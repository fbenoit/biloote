import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { closeDatabase, connectDatabase, seed } from './MongoProvider'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {}

  public async boot() {
    await connectDatabase()
  }

  public async ready() {
    await seed()
  }

  public async shutdown() {
    await closeDatabase()
  }
}
