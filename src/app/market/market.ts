export class MarketStat {
   public typeName: string;
   public groupID: number = 0;
   public categoryID: number = 0;
   public itemVolume: number = 1;
   public avgVol7Day: number;
   public avgVol30Day: number;
   public avgPrice: number;
   public expPrice: number;
   public impPrice: number;
   public impVolume: number;
   public impOrders: number;
   public avgRevenue: number;
   public doctrines: string = "";
   public active1Hour: number;
   public active3Hour: number;
   public active24Hour: number;

   public profit: number = this.impPrice - this.expPrice;
   public profitPerM3: number = 0;
   public margin: number = 0;

   constructor(
      public typeID: number
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
      public active1Hour: number,
      public active3Hour: number,
      public active24Hour: number
   ){}
}

export class MarketItemCalc {
   public profit: string;
   public margin: string;
   public profitPerM3: string;
}