import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PIDataRaw, PIData, SubPIData, MarketOrderType } from './pi-data';

import { PIDataService } from './pi-data.service';
import { PICalcService } from './pi-calc.service';

import { POCOTax } from './pi-data';

@Component({
   moduleId: module.id,
   selector: 'p3-p4',
   templateUrl: './p3-p4.component.html',
   styleUrls: ['../css/pi-data.css']
})

export class P3toP4Component {
   data: PIData[] = [];
   sourceData: PIDataRaw[];
   typeIDs: any;
   topPClass: number = 4;
   subPClass: number[] = [1,3];
   ratioP3Single: number = 6; // 18 / 3
   ratioP1Single: number = 40;

   show: number = 0;
   prodOutput: number = 0;
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
         let inpP3: PIDataRaw = subData.filter(tid => tid.typeId == d.input1)[0];
         newSub = [];
         newSub.push(new SubPIData(
            inpP3.typeId,
            inpP3.name,
            inpP3.pClass,
            (this.buyFromType == MarketOrderType.buy) ? inpP3.buy : inpP3.sell,
            this.ratioP3Single
         ));

         inpP3 = subData.filter(tid => tid.typeId == d.input2)[0];
         newSub.push(new SubPIData(
            inpP3.typeId,
            inpP3.name,
            inpP3.pClass,
            (this.buyFromType == MarketOrderType.buy) ? inpP3.buy : inpP3.sell,
            this.ratioP3Single
         ));

         // input3 could be a P3 or a P1
         inpP3 = subData.filter(tid => tid.typeId == d.input3)[0];
         newSub.push(new SubPIData(
            inpP3.typeId,
            inpP3.name,
            inpP3.pClass,
            (this.buyFromType == MarketOrderType.buy) ? inpP3.buy : inpP3.sell,
            (inpP3.pClass == 3) ? this.ratioP3Single : this.ratioP1Single
         ));

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