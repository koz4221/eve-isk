import { Component, OnInit } from '@angular/core';

import { PIData } from './pi-data';

import { PIDataService } from './pi-data.service';
import { PICalcService } from './pi-calc.service';

@Component({
   moduleId: module.id,
   selector: 'p1-p2-table',
   templateUrl: './p1-p2-table.component.html',
   styleUrls: ['../css/pi-data.css']
})

export class P1toP2TableComponent implements OnInit {
   data: PIData[] = [];

   constructor(
      public piDataService: PIDataService, 
      public piCalcService: PICalcService
   ) {}

   ngOnInit(): void {
      this.loadData();
   }

   public loadData(): void {
      this.data = this.piDataService.data.filter(tid => tid.pClass === 2);
   }

   isTotalPositive(p: PIData, sellToBuyOrder: boolean): boolean {
      if (p.buy != 0 && p.sell != 0) {
         if (+this.getP1toP2TotalProfit(p, sellToBuyOrder) > 0) {
            return true;
         }
      }
      return false;
   }

   isTotalNegative(p: PIData, sellToBuyOrder: boolean): boolean {
      if (p.buy != 0 && p.sell != 0) {
         if (this.getP1toP2TotalProfit(p, sellToBuyOrder) < 0) {
            return true;
         }
      }
      return false;
   }

   // function solely to make the html {{}} not hideous
   public getPIDataByTypeID(typeID: number): PIData {
      return this.piDataService.getPIDataByTypeID(typeID)
   }

   public getP1toP2TotalProfit(p: PIData, sellToBuyOrder: boolean): number {
      let total: number = this.piCalcService.getP1toP2TotalProfit(
         this.piDataService.getPIDataByTypeID(p.input1).sell,
         this.piDataService.getPIDataByTypeID(p.input2).sell,
         (sellToBuyOrder == true) ? p.buy : p.sell
      )

      return total;
   }
}