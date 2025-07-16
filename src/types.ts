export interface Station {
  id: number
  name: string
}

export interface Booking {
  id: number
  customerName: string
  startDate: string
  endDate: string
  stationName?: string
  pickupReturnStationId: number
}
