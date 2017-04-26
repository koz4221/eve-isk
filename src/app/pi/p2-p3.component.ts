import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PIDataRaw, PIData, SubPIData, MarketOrderType } from './pi-data';

import { PIDataService } from './pi-data.service';
import { PICalcService } from './pi-calc.service';

import { POCOTax } from './pi-data';

@Component({
   moduleId: module.id,
   selector: 'p2-p3',
   templateUrl: './p2-p3.component.html',
   styleUrls: ['../css/pi-data.css']
})

export class P2toP3Component {
   data: PIData[] = [];
   sourceData: PIDataRaw[];
   typeIDs: any;
   topPClass: number = 3;
   subPClass: number[] = [2];
   ratioP2Single: number = 3.33; // 10 / 3

   show: number = 0;
   isCollapsed: boolean = true;
   prodOutput: number = 60;
   buyFromType: MarketOrderType
   sellToType: MarketOrderType
   
   constructor(
      public piDataService: PIDataService, 
      public piCalcService: PICalcService,
      private route: ActivatedRoute
   ) {}

   public loadData(data?: PIDataRaw[]): void {
      if (data) this.sourceData = data;

      this.buyFromType = this.piCalcService.buyFromType;
      this.sellToType = this.piCalcService.sellToType;

      let topData: PIDataRaw[] = this.sourceData.filter(tid => tid.pClass === this.topPClass);
      let subData: PIDataRaw[] = this.sourceData.filter(tid => this.subPClass.includes(tid.pClass));

      let newSub: SubPIData[];
      this.data = [];

      for (let d of topData) {
         let inpP2: PIDataRaw = subData.find(tid => tid.typeId == d.input1);
         newSub = [];
         newSub.push(new SubPIData(
            inpP2.typeId,
            inpP2.name,
            inpP2.pClass,
            (this.buyFromType == MarketOrderType.buy) ? inpP2.buy : inpP2.sell,
            this.ratioP2Single
         ));

         inpP2 = subData.find(tid => tid.typeId == d.input2);
         newSub.push(new SubPIData(
            inpP2.typeId,
            inpP2.name,
            inpP2.pClass,
            (this.buyFromType == MarketOrderType.buy) ? inpP2.buy : inpP2.sell,
            this.ratioP2Single
         ));

         inpP2 = subData.find(tid => tid.typeId == d.input3);
         if (inpP2) {
            newSub.push(new SubPIData(
               inpP2.typeId,
               inpP2.name,
               inpP2.pClass,
               (this.buyFromType == MarketOrderType.buy) ? inpP2.buy : inpP2.sell,
               this.ratioP2Single
            ));
         }
         
         // now add a sub for the costs of the product (sales and POCO taxes)
         newSub.push(new SubPIData(
            d.typeId,
            d.name,
            d.pClass,
            (this.sellToType == MarketOrderType.buy) ? d.buy : d.sell,
            1
         ))

         this.data.push(new PIData(
            d.typeId,
            d.name,
            d.pClass,
            (this.sellToType == MarketOrderType.buy) ? d.buy : d.sell,
            1,
            newSub
         ))
      }

      this.piCalcService.calculateCosts(this.data, this.topPClass, this.subPClass);
   }

   public formatNumberString(num: number): string {
      if (num) return this.piCalcService.formatNumberString(num);
      return "";
   }
}