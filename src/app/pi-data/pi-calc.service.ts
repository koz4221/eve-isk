import { Injectable } from '@angular/core';

import { CommandCenterStat } from '../../static-data/pi-building-stats'
import { PIBuildingStat } from '../../static-data/pi-building-stats'

import { COMMAND_CENTER_STATS } from '../../static-data/pi-building-stats'
import { PI_BUILDING_STATS } from '../../static-data/pi-building-stats'

@Injectable()
export class PICalcService {
   public CCUpgradeSkill: number = 0;
   public EHeadProdPerHour: number = 1;

   // calculated values
   private numEtoP2AdvFact_1P: number = 0

   eToP1ProdPerHourPerDur: {day: number, amt: number}[] = [
      {day: 1, amt: 320},
      {day: 3, amt: 240},
      {day: 7, amt: 153}
   ]

   formatNumberString(num: number): string {
      let fNum: string

      // decimal precision
      if (num < 1000) {
         fNum = num.toFixed(2);
      } else {
         fNum = num.toFixed(0);
      }

      // add commas for big numbers
      fNum = fNum.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      return fNum;
   }

   resetCalculatedValues(): void {
      this.numEtoP2AdvFact_1P = 0;
   }

   getTotalPlanetPower(): number {
      let totalPwr: number = COMMAND_CENTER_STATS.find(cc => cc.level == this.CCUpgradeSkill).power;

      // assume planet will have a spaceport/launchpad
      totalPwr = totalPwr - PI_BUILDING_STATS.find(b => b.code == "launchpad").power;

      return totalPwr;
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

   getP0TotalDayProd(): string {
      return this.formatNumberString(this.EHeadProdPerHour * this.getEHeadsPerPlanet() * 24);
   }

   getP0TotalDayProfit(buyPrice: number): string {
      return this.formatNumberString(this.EHeadProdPerHour * this.getEHeadsPerPlanet() * 24 * buyPrice);
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

      for (var i = 1; i <= 20; i++) {
         if (factEHeadRatio * basicPwr * i + ((i * ehPwr) + ((Math.floor((i - 1) / 10) + 1) * ecuPwr)) > totalPower) {
            numHeads = i - 1;
            break;
         }
      }

      // factory number is likely to be a fraction, so first round up to see if it fits under total power. If not,
      // round down and use that.
      let numBIF: number = Math.ceil(numHeads * factEHeadRatio);
      if (basicPwr * numBIF + ((numHeads * ehPwr) + ((Math.floor((numHeads - 1) / 10) + 1) * ecuPwr)) > totalPower) {
         numBIF = Math.floor(numHeads * factEHeadRatio)
      }
      //console.log(numHeads + " " + numHeads * factEHeadRatio + " " + numBIF);
      return 40 * (numBIF < (numHeads * factEHeadRatio) ? numBIF : (numHeads * factEHeadRatio));
   }

   getEtoP1FactoryProdDisp(): string {
      return this.formatNumberString(this.getEtoP1FactoryProd());
   }

   // getEtoP1HourProd(): string {
   //    return this.formatNumberString(this.getEtoP1FactoryProd());
   // }

   getEtoP1TotalDayProd(): string {
      return this.formatNumberString(this.getEtoP1FactoryProd() * 24);
   }

   getEtoP1TotalDayProfit(buyPrice: number): string {
      return this.formatNumberString(this.getEtoP1FactoryProd() * 24 * buyPrice);
   }

   getEtoP2FactoryProd_1P(): number {
      let numAdvF: number
      if (this.numEtoP2AdvFact_1P == 0) {
         let totalPower: number = this.getTotalPlanetPower();
         let ecuPwr: number = PI_BUILDING_STATS.find(b => b.code == "ecu").power;
         let ehPwr: number = PI_BUILDING_STATS.find(b => b.code == "ehead").power;
         let basicPwr: number = PI_BUILDING_STATS.find(b => b.code == "basic").power;
         let advPwr: number = PI_BUILDING_STATS.find(b => b.code == "adv").power;

         let factEHeadRatio: number = 6000 / this.EHeadProdPerHour;

         for (var i = 1; i <= 20; i++) {
            if ((advPwr * i) + (basicPwr * i * 2) + 
               ((Math.ceil(i * factEHeadRatio) * ehPwr * 2) + 
               ((Math.floor((i * factEHeadRatio - 1) / 10) + 1) * ecuPwr * 2)) > totalPower) {
               numAdvF = i - 1;
               break;
            }
         }

         this.numEtoP2AdvFact_1P = numAdvF;
         console.log("E->p2-1p: " + numAdvF + " " + Math.ceil(numAdvF * factEHeadRatio * 2))
      } 
      else {
         numAdvF = this.numEtoP2AdvFact_1P
      }

      return 5 * numAdvF;
   }

   getEtoP2FactoryProd_1PDisp(): string {
      return this.formatNumberString(this.getEtoP2FactoryProd_1P());
   }

   getEtoP2TotalDayProd_1P(): string {
      return this.formatNumberString(this.getEtoP2FactoryProd_1P() * 24);
   }

   getEtoP2TotalDayProfit_1P(buyPrice: number): string {
      return this.formatNumberString(this.getEtoP2FactoryProd_1P() * 24 * buyPrice);
   }
}