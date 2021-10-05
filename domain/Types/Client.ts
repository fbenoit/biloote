export interface Client {
  id: string
  firstName: string
  lastName: string
  licence: ClientLicence
}

export enum ClientLicence {
  A = 'A',
  B = 'B',
}
