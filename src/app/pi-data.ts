export class PIData {
    constructor (
      public typeId: number,
      public name: string,
      public pClass: number,
      public jitaBuy: number,
      public jitaSell: number
    ){}

    public toString(): string {
       return this.typeId + " " + this.name + " " + this.pClass + " " + this.jitaBuy + " " + this.jitaSell
    }
}