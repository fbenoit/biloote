import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { VehicleType } from '../../domain/types/vehicle'
import ClientsRepository from '../Repositories/ClientsRepository'
import VehiclesRepository from '../Repositories/VehiclesRepository'

export default class RentController {
  public clientsRepository: ClientsRepository
  public vehiclesRepository: VehiclesRepository

  constructor() {
    this.clientsRepository = new ClientsRepository()
    this.vehiclesRepository = new VehiclesRepository()
  }

  public async show(ctx: HttpContextContract) {
    const vehicleType: VehicleType = ctx.params.vehicleType

    if (!this.isAllowedVehicleType(vehicleType)) {
      return ctx.response.notFound()
    }

    const clients = await this.clientsRepository.getClients()
    const vehicles = await this.vehiclesRepository.getByVehicleType(vehicleType)

    return ctx.view.render('rent', {
      vehicleTypeName: this.getVehicleTypeName(vehicleType),
      vehicles,
      clients,
    })
  }

  private getVehicleTypeName(vehicleType: VehicleType): string {
    switch (vehicleType) {
      case VehicleType.BICYCLE:
        return 'vélo électrique'
      case VehicleType.MOTORBIKE:
        return 'moto électrique'
      case VehicleType.SCOOTER:
        return 'scooter électrique'
    }
  }

  private isAllowedVehicleType(vehicleType: VehicleType): boolean {
    return (
      vehicleType === VehicleType.BICYCLE ||
      vehicleType === VehicleType.MOTORBIKE ||
      vehicleType === VehicleType.SCOOTER
    )
  }
}
