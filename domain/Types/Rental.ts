import { Client } from './Client'
import { Vehicle } from './Vehicle'

export interface Rental {
  id?: string
  vehicle: Vehicle
  client: Client
  startDate: Date
  endDate: Date
}
