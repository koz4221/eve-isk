import { Injectable } from '@angular/core';

import { PIDataRaw, PIData, SubPIData } from './pi-data';

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

   public p1p3Output: number = 0;

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

   calculateCosts(p4data: PIData[], topPClass: number, subPClass: number[]): void {
      let POCOtax: number

      for (let d of p4data) {
         d.inputCost = 0;
         for (let s of d.subdata.filter(p => subPClass.includes(p.pClass))) {
            s.inputCost = (s.price * s.quantity);
            d.inputCost += s.inputCost
         }

         d.POCOCost = 0;
         for (let s of d.subdata) {
            POCOtax = this.POCO_TAXES.find(p => p.pClass == s.pClass).tax
            s.POCOCost = s.quantity * POCOtax * (this.numPOCOTax / 100)
            if (subPClass.includes(s.pClass)) { s.POCOCost /= 2 }
            d.POCOCost += s.POCOCost
         }

         // only tax the end product because only the seller gets taxed
         d.taxCost = 0;
         for (let s of d.subdata.filter(p => p.pClass == topPClass)) {
            s.taxCost = s.price * s.quantity * (this.numSalBroTax / 100);
            d.taxCost += s.taxCost
         }

         d.totalCost = d.inputCost + d.POCOCost + d.taxCost;
      }
   }
}