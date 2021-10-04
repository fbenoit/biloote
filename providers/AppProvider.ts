import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { MongoProvider } from './MongoProvider'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {}

  public async boot() {
    await MongoProvider.connect()
  }

  public async ready() {
    await MongoProvider.seed()
  }

  public async shutdown() {
    await MongoProvider.close()
  }
}
