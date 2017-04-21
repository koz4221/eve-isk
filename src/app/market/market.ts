export class MarketStat {
   constructor(
      public typeID: number,
      public typeName: string,
      public stats: MarketLocationStat[],
   ){}
}

export class MarketLocationStat {
   constructor(
      public locationID: number,
      public locationName: string,
      public regionID: number,
      public price: number
   ){}
}