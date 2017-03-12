import { Injectable } from '@angular/core';

@Injectable()
export class PICalcService {
   eHeadsPerPlanet: number = 16;
   eHeadProdPerHourPerDur: {day: number, amt: number}[] = [
      {day: 1, amt: 5600},
      {day: 3, amt: 3600},
      {day: 7, amt: 2300}
   ]

   getEHeadsPerPlanet() { return this.eHeadsPerPlanet; }

   getHourProdPerDur(dayRange: number): number {
      return this.eHeadProdPerHourPerDur.find(item => item.day == dayRange).amt;
   }

   getTotalDayProdPerDur(dayRange: number): number {
      return this.eHeadProdPerHourPerDur.find(item => item.day == dayRange).amt * this.eHeadsPerPlanet * 24;
   }
}