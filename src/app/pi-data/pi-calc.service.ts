import { Injectable } from '@angular/core';

import { CommandCenterStat } from '../../static-data/pi-building-stats'
import { PIBuildingStat } from '../../static-data/pi-building-stats'

import { COMMAND_CENTER_STATS } from '../../static-data/pi-building-stats'
import { PI_BUILDING_STATS } from '../../static-data/pi-building-stats'
import { POCOTax } from './pi-data';

@Injectable()
export class PICalcService {
   public CCUpgradeSkill: number = 0;
   public EHeadProdPerHour: number = 1;
   public numLaunchpads: number = 0;
   public numStorage: number = 0;
   public numSalBroTax: number = 0;
   public numPOCOTax: number = 0;
   public numLinks: number = 0;
   public numAvgLinkLength: number = 0;

   // calculated values
   private numEtoP1EHeads: number = 0;
   private numEtoP1BasFact: number = 0;
   private numEtoP2EHeads_1P: number = 0;
   private numEtoP2BasFact_1P: number = 0;
   private numEtoP2AdvFact_1P: number = 0;
   private numEtoP2EHeads_2P: number = 0;
   private numEtoP2BasFact_2P: number = 0;
   private numEtoP2AdvFact_2P: number = 0;
   private numFactPlanAdvFact: number = 0;

   private POCO_TAXES: POCOTax[] = [
      { pClass: 0, tax: 5 },
      { pClass: 1, tax: 400 },
      { pClass: 2, tax: 7200 },
      { pClass: 3, tax: 60000 },
      { pClass: 4, tax: 1200000 }
   ];

   formatNumberString(num: number): string {
      let fNum: string

      // decimal precision
      if (num < 1000 && num > -1000) {
         fNum = num.toFixed(2);
      } else {
         fNum = num.toFixed(0);
      }

      // add commas for big numbers
      fNum = fNum.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      return fNum;
   }

   getCSSColorPosNeg(val: number): string {
      if (val >= 0) {
         return "green";
      }
      else {
         return "red";
      }
   }

   resetCalculatedValues(): void {
      this.numEtoP1EHeads = 0;
      this.numEtoP2AdvFact_1P = 0;
      this.numEtoP2AdvFact_2P = 0;
      this.numFactPlanAdvFact = 0;
   }

   getTotalPlanetPower(): number {
      let totalPwr: number = COMMAND_CENTER_STATS.find(cc => cc.level == this.CCUpgradeSkill).power;

      // launchpads
      totalPwr = totalPwr - this.numLaunchpads * PI_BUILDING_STATS.find(b => b.code == "launchpad").power;

      // storage facilities
      totalPwr = totalPwr - this.numStorage * PI_BUILDING_STATS.find(b => b.code == "storage").power;

      // links
      totalPwr = totalPwr - this.numLinks * (10 + (this.numAvgLinkLength * 0.15))

      return totalPwr;
   }

   includeImportFees(val: number, inputProd: number, pClass: number): number {
      return val + (inputProd * this.POCO_TAXES.find(p => p.pClass == pClass).tax 
         * (this.numPOCOTax / 100) * 0.5);
   }

   includeExportFees(val: number, outputProd: number, pClass: number): number {
      return val - (val * (this.numSalBroTax / 100)) - (outputProd * this.POCO_TAXES.find(p => p.pClass == pClass).tax 
         * (this.numPOCOTax / 100));
   }

   // p0 calculations
   getEHeadsPerPlanet(): number {
      let totalPower: number = this.getTotalPlanetPower();
      let ecuPwr: number = PI_BUILDING_STATS.find(b => b.code == "ecu").power;
      let ehPwr: number = PI_BUILDING_STATS.find(b => b.code == "ehead").power;

      for (var i = 1; i <= 30; i++) {
         if ((i * ehPwr) + ((Math.floor((i - 1) / 10) + 1) * ecuPwr) > totalPower) {
            return i - 1;
         }
      }
      return 0;
   }

   getP0HourProd(): string {
      return this.formatNumberString(this.EHeadProdPerHour);
   }

   getP0TotalDayProd(): number {
      return this.EHeadProdPerHour * this.getEHeadsPerPlanet() * 24;
   }

   getP0TotalDayProfit(buyPrice: number): string {
      let val: number = this.EHeadProdPerHour * this.getEHeadsPerPlanet() * 24 * buyPrice;
      return this.formatNumberString(this.includeExportFees(val, this.EHeadProdPerHour * this.getEHeadsPerPlanet(), 0));
   }

   // E -> p1 calculations
   getEtoP1FactoryProd(): number { 
      // this calculation is based on extracting raw p0 materials and converting them to p1 through
      // basic factories on one planet.
      let totalPower: number = this.getTotalPlanetPower();
      let ecuPwr: number = PI_BUILDING_STATS.find(b => b.code == "ecu").power;
      let ehPwr: number = PI_BUILDING_STATS.find(b => b.code == "ehead").power;
      let basicPwr: number = PI_BUILDING_STATS.find(b => b.code == "basic").power;

      // every hour one basic factory consumes 6000 raw p0. This calculation gets the ratio of
      // how many factories are needed per extractor head based on hourly production
      let factEHeadRatio: number = this.EHeadProdPerHour / 6000;
      let numHeads: number
      let numBIF: number

      if (this.numEtoP1EHeads == 0) {
         for (var i = 1; i <= 20; i++) {
            if (factEHeadRatio * basicPwr * i + ((i * ehPwr) + ((Math.floor((i - 1) / 10) + 1) * ecuPwr)) > totalPower) {
               numHeads = i - 1;
               break;
            }
         }

         // factory number is likely to be a fraction, so first round up to see if it fits under total power. If not,
         // round down and use that.
         numBIF = Math.ceil(numHeads * factEHeadRatio);
         if (basicPwr * numBIF + ((numHeads * ehPwr) + ((Math.floor((numHeads - 1) / 10) + 1) * ecuPwr)) > totalPower) {
            numBIF = Math.floor(numHeads * factEHeadRatio)
         }

         this.numEtoP1EHeads = numHeads;
         this.numEtoP1BasFact = numBIF;
      }
      else {
         numHeads = this.numEtoP1EHeads;
         numBIF = this.numEtoP1BasFact;
      }

      return 40 * (numBIF < (numHeads * factEHeadRatio) ? numBIF : (numHeads * factEHeadRatio));
   }

   getEtoP1FactoryProdDisp(): string {
      return this.formatNumberString(this.getEtoP1FactoryProd());
   }

   // getEtoP1HourProd(): string {
   //    return this.formatNumberString(this.getEtoP1FactoryProd());
   // }

   getEtoP1TotalDayProd(): number {
      return this.getEtoP1FactoryProd() * 24;
   }

   getEtoP1TotalDayProfit(buyPrice: number): string {
      let val: number = this.getEtoP1FactoryProd() * 24 * buyPrice;
      return this.formatNumberString(this.includeExportFees(val, this.getEtoP1FactoryProd(), 1));
   }

   getEtoP2FactoryProd_1P(): number {
      let totalPower: number = this.getTotalPlanetPower();
      let ecuPwr: number = PI_BUILDING_STATS.find(b => b.code == "ecu").power;
      let ehPwr: number = PI_BUILDING_STATS.find(b => b.code == "ehead").power;
      let basicPwr: number = PI_BUILDING_STATS.find(b => b.code == "basic").power;
      let advPwr: number = PI_BUILDING_STATS.find(b => b.code == "adv").power;

      let numAdvF: number
      let numBasF: number
      let numEHeads: number
      let factEHeadRatio: number = 6000 / this.EHeadProdPerHour;

      if (this.numEtoP2AdvFact_1P == 0) {
         for (var i = 1; i <= 20; i++) {
            if ((advPwr * i) + (basicPwr * i * 2) + 
               ((Math.floor(i * factEHeadRatio) * ehPwr * 2) + 
               ((Math.floor((i * factEHeadRatio - 1) / 10) + 1) * ecuPwr * 2)) > totalPower) {
               numAdvF = i - 1;
               break;
            }
         }

         // minimum eheads won't fill all factories, see if we can fit two more in to maximize output
         numEHeads = Math.floor(numAdvF * factEHeadRatio) + 2
         if ((advPwr * numAdvF) + (basicPwr * numAdvF * 2) + 
               ((numEHeads * ehPwr * 2) + 
               ((Math.floor((numEHeads - 1) / 10) + 1) * ecuPwr * 2)) > totalPower) {
               
               numEHeads = numEHeads - 2;
         }

         this.numEtoP2EHeads_1P = numEHeads;
         this.numEtoP2BasFact_1P = numAdvF * 2;
         this.numEtoP2AdvFact_1P = numAdvF;
      } 
      else {
         numEHeads = this.numEtoP2EHeads_1P;
         numAdvF = this.numEtoP2AdvFact_1P;
      }

      numBasF = numAdvF * 2;
      return 5 * (numBasF * factEHeadRatio < numEHeads ? 0.5 * numBasF : 0.5 * numBasF * 1 / factEHeadRatio);  
   }

   getEtoP2FactoryProd_1PDisp(): string {
      return this.formatNumberString(this.getEtoP2FactoryProd_1P());
   }

   getEtoP2TotalDayProd_1P(): string {
      return this.formatNumberString(this.getEtoP2FactoryProd_1P() * 24);
   }

   getEtoP2TotalDayProfit_1P(buyPrice: number): string {
      let val: number = this.getEtoP2FactoryProd_1P() * 24 * buyPrice;
      return this.formatNumberString(this.includeExportFees(val, this.getEtoP2FactoryProd_1P(), 2));
   }

   getEtoP2FactoryProd_2P(): number {
      let totalPower: number = this.getTotalPlanetPower();
      let ecuPwr: number = PI_BUILDING_STATS.find(b => b.code == "ecu").power;
      let ehPwr: number = PI_BUILDING_STATS.find(b => b.code == "ehead").power;
      let basicPwr: number = PI_BUILDING_STATS.find(b => b.code == "basic").power;
      let advPwr: number = PI_BUILDING_STATS.find(b => b.code == "adv").power;

      let numAdvF: number
      let numBasF: number
      let numEHeads: number
      let factEHeadRatio: number = 6000 / this.EHeadProdPerHour;

      if (this.numEtoP2AdvFact_2P == 0) {
         for (var i = 1; i <= 20; i++) {
            if ((advPwr * i) + (basicPwr * i * 2) + 
               ((Math.floor(i * factEHeadRatio * 2) * ehPwr) + 
               ((Math.floor((i * factEHeadRatio - 1) / 10) + 1) * ecuPwr)) > totalPower) {
               numAdvF = i - 1;
               break;
            }
         }

         // minimum eheads won't fill all factories, see if we can fit two more in to maximize output
         numEHeads = Math.floor(numAdvF * 2 * factEHeadRatio) + 1
         if ((advPwr * numAdvF) + (basicPwr * numAdvF * 2) + 
               ((numEHeads * ehPwr) + 
               ((Math.floor((numEHeads - 1) / 10) + 1) * ecuPwr)) > totalPower) {
               
               numEHeads = numEHeads - 1;
         }

         this.numEtoP2EHeads_2P = numEHeads;
         this.numEtoP2BasFact_2P = numAdvF * 2;
         this.numEtoP2AdvFact_2P = numAdvF;
      } 
      else {
         numEHeads = this.numEtoP2EHeads_2P;
         numAdvF = this.numEtoP2AdvFact_2P;
      }

      numBasF = numAdvF * 2;
      return 5 * (numBasF * factEHeadRatio < numEHeads ? 0.5 * numBasF : 0.5 * numBasF * 1 / factEHeadRatio);  
   }

   getEtoP2FactoryProd_2PDisp(): string {
      return this.formatNumberString(this.getEtoP2FactoryProd_2P());
   }

   getEtoP2TotalDayProd_2P(): string {
      return this.formatNumberString(this.getEtoP2FactoryProd_2P() * 24);
   }

   getEtoP2TotalDayProfit_2P(buyPrice: number): string {
      let val: number = this.getEtoP2FactoryProd_2P() * 24 * buyPrice;
      return this.formatNumberString(this.includeExportFees(val, this.getEtoP2FactoryProd_2P(), 2));
   }

   getFactoryPlanetAdvCount(): number {
      if (this.numFactPlanAdvFact == 0) {
         let totalPower: number = this.getTotalPlanetPower();
         let advPwr: number = PI_BUILDING_STATS.find(b => b.code == "adv").power;
         this.numFactPlanAdvFact = Math.floor(totalPower / advPwr)
      }

      return this.numFactPlanAdvFact;
   }

   getP1toP2FactoryProd(): {input: number, output: number} {
      return {input: 80 * this.getFactoryPlanetAdvCount(), output: 5 * this.getFactoryPlanetAdvCount()};
   }

   getP1toP2TotalCost(inpPrice1: number, inpPrice2: number): number {
      let inputProd: number = this.getP1toP2FactoryProd().input;
      let val: number = (inpPrice1 * inputProd * 0.5) + (inpPrice2 * inputProd * 0.5)

      return this.includeImportFees(val, inputProd, 1);
   }

   getP1toP2TotalValue(outPrice: number): number {
      let outputProd: number = this.getP1toP2FactoryProd().output;

      return this.includeExportFees(outPrice * outputProd, outputProd, 2);
   }

   getP1toP2TotalProfit(inpPrice1: number, inpPrice2: number, outPrice: number): number {
      return 24 * (this.getP1toP2TotalValue(outPrice) - this.getP1toP2TotalCost(inpPrice1, inpPrice2));
   }

   getP2toP3FactoryProd(inp3: number): {input: number, output: number} {
      if (inp3 != undefined) {
         return {input: 30 * this.getFactoryPlanetAdvCount(), output: 3 * this.getFactoryPlanetAdvCount()};
      }
      else {
         return {input: 20 * this.getFactoryPlanetAdvCount(), output: 3 * this.getFactoryPlanetAdvCount()};
      }
      
   }

   getP2toP3TotalCost(inpPrice1: number, inpPrice2: number, inpPrice3: number): number {
      let inputProd: number = this.getP2toP3FactoryProd(inpPrice3).input;
      let val: number;

      if (inpPrice3 != undefined) {
         val = (inpPrice1 * inputProd * (1/3)) + (inpPrice2 * inputProd * (1/3)) + (inpPrice3 * inputProd * (1/3));
      }
      else {
         val = (inpPrice1 * inputProd * 0.5) + (inpPrice2 * inputProd * 0.5);
      }

      //console.log(val + " " + (val + (val * (this.numSalBroTax / 100))));
      return this.includeImportFees(val, inputProd, 2);
   }

   getP2toP3TotalValue(outPrice: number): number {
      let outputProd: number = this.getP2toP3FactoryProd(0).output;
      let val: number = outPrice * outputProd;

      return this.includeExportFees(val, outputProd, 3);
   }

   getP2toP3TotalProfit(inpPrice1: number, inpPrice2: number, inpPrice3: number, outPrice: number): number {
      return 24 * (this.getP2toP3TotalValue(outPrice) - this.getP2toP3TotalCost(inpPrice1, inpPrice2, inpPrice3));
   }

   getP1toP3FactoryProd(inp3: number): {input: number, output: number} {
      if (inp3 != undefined) {
         return {input: 80 * (6/7) * this.getFactoryPlanetAdvCount(), output: 3 * (1/7) * this.getFactoryPlanetAdvCount()};
      }
      else {
         return {input: 80 * 0.8 * this.getFactoryPlanetAdvCount(), output: 3 * 0.2 * this.getFactoryPlanetAdvCount()};
      }
      
   }

   getP1toP3TotalCost(inpPrice1_1: number, inpPrice1_2: number, inpPrice2_1: number, inpPrice2_2: number, 
      inpPrice3_1: number, inpPrice3_2: number): number {

      let inputProd: number = this.getP1toP3FactoryProd(inpPrice3_1).input;
      let val: number;

      if (inpPrice3_1 != undefined) {
         val = (inpPrice1_1 * inputProd * (1/6)) + (inpPrice1_2 * inputProd * (1/6)) + (inpPrice2_1 * inputProd * (1/6)) +
            (inpPrice2_2 * inputProd * (1/6)) + (inpPrice3_1 * inputProd * (1/6)) + (inpPrice3_2 * inputProd * (1/6));
      }
      else {
         val = (inpPrice1_1 * inputProd * 0.25) + (inpPrice1_2 * inputProd * 0.25) + (inpPrice2_1 * 0.25) + (inpPrice2_2 * 0.25);
      }

      return this.includeImportFees(val, inputProd, 1);
   }

   getP1toP3TotalValue(outPrice: number): number {
      let outputProd: number = this.getP1toP3FactoryProd(0).output;

      return this.includeExportFees(outPrice * outputProd, outputProd, 3);
   }

   getP1toP3TotalProfit(inpPrice1_1: number, inpPrice1_2: number, inpPrice2_1: number, inpPrice2_2: number, 
      inpPrice3_1: number, inpPrice3_2: number, outPrice: number): number {
      
      return 24 * (this.getP1toP3TotalValue(outPrice) - this.getP1toP3TotalCost(inpPrice1_1, inpPrice1_2, inpPrice2_1, 
         inpPrice2_2, inpPrice3_1, inpPrice3_2));
   }
}