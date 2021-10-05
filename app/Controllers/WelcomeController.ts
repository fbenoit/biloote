import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RentalsRepository from '../Repositories/RentalsRepository'

export default class WelcomeController {
  private rentalsRepository = new RentalsRepository()

  public async index(ctx: HttpContextContract) {
    const rentals = await this.rentalsRepository.getRentals()
    return ctx.view.render('welcome', { rentals })
  }
}
