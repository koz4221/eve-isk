export class PIDataRaw {
    constructor (
      public typeId: number,
      public name: string,
      public pClass: number,
      public buy: number,
      public sell: number,
      public input1?: number,
      public input2?: number,
      public input3?: number
    ){}
}

export class PIData {
   public inputCost: number
   public POCOCost: number
   public taxCost: number
   public totalCost: number

   constructor(
      public typeId: number,
      public name: string,
      public pClass: number,
      public price: number,
      public quantity: number,
      public subdata: SubPIData[]
   ){}
}

export class SubPIData {
   public inputCost: number
   public POCOCost: number
   public taxCost: number

   constructor(
      public typeId: number,
      public name: string,
      public pClass: number,
      public price: number,
      public quantity: number,
   ){}
}

export class PITypeID {
   constructor (
      public typeID: number,
      public typeName: string,
      public pClass: number
   ) {}
}

export class POCOTax {
   constructor (
      public pClass: number,
      public tax: number
   ) {}
}

export enum MarketOrderType {
   buy = 1,
   sell = 2
}