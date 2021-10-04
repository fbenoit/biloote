export interface Vehicle {
  id: string
  name: string
  type: VehicleType
}

export enum VehicleType {
  BICYCLE = 'bicycle',
  SCOOTER = 'scooter',
  MOTORBIKE = 'motorbike',
}
