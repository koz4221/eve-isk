import { Component, OnInit } from '@angular/core';

import { PIData } from './pi-data';

import { PIDataService } from './pi-data.service';
import { PICalcService } from './pi-calc.service';

@Component({
   moduleId: module.id,
   selector: 'p2-p3-table',
   templateUrl: './p2-p3-table.component.html',
   styleUrls: ['../css/pi-data.css']
})

export class P2toP3TableComponent implements OnInit {
   data: PIData[] = [];

   constructor(
      public piDataService: PIDataService, 
      public piCalcService: PICalcService
   ) {}

   ngOnInit(): void {
      this.data = this.piDataService.data.filter(tid => tid.pClass === 3);
   }

   public isTotalPositive(p: PIData, sellToBuyOrder: boolean): boolean {
      if (p.jitaBuy != 0 && p.jitaSell != 0) {
         if (+this.getP2toP3TotalProfit(p, sellToBuyOrder) > 0) {
            return true;
         }
      }
      return false;
   }

   isTotalNegative(p: PIData, sellToBuyOrder: boolean): boolean {
      if (p.jitaBuy != 0 && p.jitaSell != 0) {
         if (this.getP2toP3TotalProfit(p, sellToBuyOrder) < 0) {
            return true;
         }
      }
      return false;
   }

   // function solely to make the html {{}} not hideous
   public getPIDataByTypeID(typeID: number): PIData {
      if (typeID == undefined) return undefined;
      return this.piDataService.getPIDataByTypeID(typeID);
   }

   public getP2toP3TotalProfit(p: PIData, sellToBuyOrder: boolean): number {
      let total: number = this.piCalcService.getP2toP3TotalProfit(
         this.piDataService.getPIDataByTypeID(p.input1).jitaSell,
         this.piDataService.getPIDataByTypeID(p.input2).jitaSell,
         (p.input3 == undefined) ? undefined : this.piDataService.getPIDataByTypeID(p.input3).jitaSell,
         (sellToBuyOrder == true) ? p.jitaBuy : p.jitaSell
      )
      
      return total;
   }
}