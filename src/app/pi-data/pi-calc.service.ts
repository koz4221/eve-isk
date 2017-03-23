import { Injectable } from '@angular/core';

import { CommandCenterStat } from '../../static-data/pi-building-stats'
import { PIBuildingStat } from '../../static-data/pi-building-stats'

import { COMMAND_CENTER_STATS } from '../../static-data/pi-building-stats'
import { PI_BUILDING_STATS } from '../../static-data/pi-building-stats'

@Injectable()
export class PICalcService {
   public CCUpgradeSkill: number = 0;
   public EHeadProdPerHour: number = 0;

   eHeadProdPerHourPerDur: {day: number, amt: number}[] = [
      {day: 1, amt: 5600},
      {day: 3, amt: 3600},
      {day: 7, amt: 2300}
   ]
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

      for (var i = 0; i <= 30; i++) {
         if ((i * ehPwr) + ((Math.floor(i / 10) + 1) * ecuPwr) > totalPower) {
            return i - 1;
         }
      }
      return 0;
   }

   getP0HourProdPerDur(dayRange: number): string {
      return this.formatNumberString(this.eHeadProdPerHourPerDur.find(item => item.day == dayRange).amt);
   }

   getP0TotalDayProdPerDur(dayRange: number): string {
      return this.formatNumberString(this.eHeadProdPerHourPerDur.find(item => item.day == dayRange).amt * this.getEHeadsPerPlanet() * 24);
   }

   getP0TotalDayProfitPerDur(dayRange: number, buyPrice: number): string {
      return this.formatNumberString(this.eHeadProdPerHourPerDur.find(item => item.day == dayRange).amt * this.getEHeadsPerPlanet() * 24 * buyPrice);
   }

   // E -> p1 calculations
   getMaxEtoP1Factories(): number { 
      // this calculation is based on extracting raw p0 materials and converting them to p1 through
      // basic factories on one planet.
      let totalPower: number = this.getTotalPlanetPower();
      let ecuPwr: number = PI_BUILDING_STATS.find(b => b.code == "ecu").power;
      let ehPwr: number = PI_BUILDING_STATS.find(b => b.code == "ehead").power;
      let basicPwr: number = PI_BUILDING_STATS.find(b => b.code == "basic").power;

      // every hour one basic factory consumes 6000 raw p0. This calculation gets the ratio of
      // how many factories are needed per extractor head based on hourly production
      let factEHeadRatio: number = this.EHeadProdPerHour / 6000;

      for (var i = 0; i <= 20; i++) {
         console.log(i + ": " + (factEHeadRatio * basicPwr * i + ((i * ehPwr) + ((Math.floor(i / 10) + 1) * ecuPwr))))
      }
      return 0
   }

   getEtoP1HourProdPerDur(dayRange: number): string {
      return this.formatNumberString(this.eToP1ProdPerHourPerDur.find(item => item.day == dayRange).amt);
   }

   getEtoP1TotalDayProdPerDur(dayRange: number): string {
      return this.formatNumberString(this.eToP1ProdPerHourPerDur.find(item => item.day == dayRange).amt * 24);
   }

   getEtoP1TotalDayProfitPerDur(dayRange: number, buyPrice: number): string {
      return this.formatNumberString(this.eToP1ProdPerHourPerDur.find(item => item.day == dayRange).amt * 24 * buyPrice);
   }
}