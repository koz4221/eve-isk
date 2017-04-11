import { Component, OnInit } from '@angular/core';

import { PIData } from './pi-data';

import { PIDataService } from './pi-data.service';
import { PICalcService } from './pi-calc.service';

@Component({
   moduleId: module.id,
   selector: 'p1-p3-table',
   templateUrl: './p1-p3-table.component.html',
   styleUrls: ['../css/pi-data.css']
})

export class P1toP3TableComponent implements OnInit {
   data: PIData[] = [];

   constructor(
      public piDataService: PIDataService, 
      public piCalcService: PICalcService
   ) {}

   ngOnInit(): void {
      this.loadData();
   }

   public loadData(): void {
      this.data = this.piDataService.data.filter(tid => tid.pClass === 3);
   }

   public isTotalPositive(p: PIData, sellToBuyOrder: boolean): boolean {
      if (p.buy != 0 && p.sell != 0) {
         if (this.getTotalProfit(p, sellToBuyOrder) > 0) {
            return true;
         }
      }
      return false;
   }

   isTotalNegative(p: PIData, sellToBuyOrder: boolean): boolean {
      if (p.buy != 0 && p.sell != 0) {
         if (this.getTotalProfit(p, sellToBuyOrder) < 0) {
            return true;
         }
      }
      return false;
   }

   // function solely to make the html {{}} not hideous
   public getP1PIDataByTypeID(typeID: number, inputNum: number): PIData {
      if (typeID == undefined) return undefined;

      let pi = this.piDataService.getPIDataByTypeID(typeID);
      if (inputNum == 1) {
         return this.piDataService.getPIDataByTypeID(pi.input1);
      }
      else if (inputNum == 2) {
         return this.piDataService.getPIDataByTypeID(pi.input2);
      }
      else return undefined;
   }

   public getTotalCost(p: PIData): number {
      let cost: number = this.piCalcService.getP1toP3TotalCost(
         this.getP1PIDataByTypeID(p.input1, 1).sell,
         this.getP1PIDataByTypeID(p.input1, 2).sell,
         this.getP1PIDataByTypeID(p.input2, 1).sell,
         this.getP1PIDataByTypeID(p.input2, 2).sell,
         (p.input3 == undefined) ? undefined : this.getP1PIDataByTypeID(p.input3, 1).sell,
         (p.input3 == undefined) ? undefined : this.getP1PIDataByTypeID(p.input3, 2).sell
      )

      return cost;
   }

   public getTotalProfit(p: PIData, sellToBuyOrder: boolean): number {
      let total: number = this.piCalcService.getP1toP3TotalProfit(
         this.getP1PIDataByTypeID(p.input1, 1).sell,
         this.getP1PIDataByTypeID(p.input1, 2).sell,
         this.getP1PIDataByTypeID(p.input2, 1).sell,
         this.getP1PIDataByTypeID(p.input2, 2).sell,
         (p.input3 == undefined) ? undefined : this.getP1PIDataByTypeID(p.input3, 1).sell,
         (p.input3 == undefined) ? undefined : this.getP1PIDataByTypeID(p.input3, 2).sell,
         (sellToBuyOrder == true) ? p.buy : p.sell
      )
      
      return total;
   }
}