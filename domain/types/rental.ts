import { Client } from './client'
import { Vehicle } from './vehicle'

export interface Rental {
  id: string
  vehicle: Vehicle
  client: Client
  startDate: Date
  endDate: Date
}
