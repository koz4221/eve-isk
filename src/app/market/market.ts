export class MarketStat {
   constructor(
      public typeID: number,
      public typeName: string,
      public itemVolume: number,
      public avgVol7Day: number,
      public avgVol30Day: number,
      public avgPrice: number,
      public stats: MarketLocationStat[],
   ){}
}

export class MarketLocationStat {
   constructor(
      public locationID: number,
      public locationName: string,
      public regionID: number,
      public price: number,
      public totVolume: number,
      public totOrders: number,
   ){}
}

export class MarketItemCalc {
   public profit: string;
   public margin: string;
   public profitPerM3: string;
}