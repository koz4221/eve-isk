export class PIData {
    constructor (
      public typeId: number,
      public name: string,
      public pClass: number,
      public jitaBuy: number,
      public jitaSell: number,
      public input1?: number,
      public input2?: number,
      public input3?: number
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