export class MarketOrder {
    constructor (
      public orderID: number,
      public charID: number,
      public stationID: number,
      public volEntered: number,
      public volRemaining: number,
      public orderState: number,
      public typeID: number,
      public typeName: string,
      public price: number,
      public duration: number,
      public issued: string,
      public isBuyOrder: boolean,
      public topOrderID?: number,
      public topPrice?: number,
      public topNumOrders?: number,
      public topVolume?: number
    ){}
}

export class Transaction {
   constructor(
      public tranID: number,
      public tranDate: string,
      public quantity: number,
      public typeID: number,
      public typeName: string,
      public price: number
   ){}
}