export class MarketStat {
   public typeName: string;
   public groupID: number = 0;
   public categoryID: number = 0;
   public itemVolume: number;
   public avgVol7Day: number;
   public avgVol30Day: number;
   public avgPrice: number;
   public expPrice: number;
   public impPrice: number;
   public impVolume: number;
   public impOrders: number;

   constructor(
      public typeID: number,
      //public stats: MarketLocationStat[],
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