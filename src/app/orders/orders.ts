export class MarketOrder {
    constructor (
      public orderID: number,
      public charID: number,
      public stationID: number,
      public volEntered: number,
      public volRemaining: number,
      public orderState: string,
      public typeID: number,
      public price: number,
      public duration: number,
      public issued: string,
      public isBuyOrder: boolean
    ){}
}