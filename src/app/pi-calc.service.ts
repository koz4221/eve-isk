import { Injectable } from '@angular/core';

@Injectable()
export class PICalcService {
   eHeadsPerPlanet: number = 16;
   eHeadProdPerHourPerDur: {day: number, amt: number}[] = [
      {day: 1, amt: 5600},
      {day: 3, amt: 3600},
      {day: 7, amt: 2300}
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

   getEHeadsPerPlanet() { return this.eHeadsPerPlanet; }

   getHourProdPerDur(dayRange: number): string {
      return this.formatNumberString(this.eHeadProdPerHourPerDur.find(item => item.day == dayRange).amt);
   }

   getTotalDayProdPerDur(dayRange: number): string {
      return this.formatNumberString(this.eHeadProdPerHourPerDur.find(item => item.day == dayRange).amt * this.eHeadsPerPlanet * 24);
   }

   getTotalDayProfitPerDur(dayRange: number, buyPrice: number): string {
      return this.formatNumberString(this.eHeadProdPerHourPerDur.find(item => item.day == dayRange).amt * this.eHeadsPerPlanet * 24 * buyPrice);
   }
}