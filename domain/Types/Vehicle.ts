interface BaseVehicle {
  id: string
  name: string
}

export type Vehicle = Motorbike | Scooter | Bicycle

export interface Bicycle extends BaseVehicle {
  type: 'bicycle'
}

export interface Scooter extends BaseVehicle {
  type: 'scooter'
  ccPower: number
}

export interface Motorbike extends BaseVehicle {
  type: 'motorbike'
  ccPower: number
}

export type VehicleType = Vehicle['type']
