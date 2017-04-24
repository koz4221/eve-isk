import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PIDataRaw, PIData, SubPIData } from './pi-data';

import { PIDataService } from './pi-data.service';
import { PICalcService } from './pi-calc.service';

import { POCOTax } from './pi-data';

@Component({
   moduleId: module.id,
   selector: 'p2-p4',
   templateUrl: './p2-p4.component.html',
   styleUrls: ['../css/pi-data.css']
})

export class P2toP4Component {
   data: PIData[] = [];
   sourceData: PIDataRaw[];
   typeIDs: any;
   topPClass: number = 4;
   midPClass: number = 3;
   subPClass: number[] = [1,2];
   ratioP2Single: number = 20; // 120 / 6
   ratioP1Single: number = 40;
   show: number = 0;

   constructor(
      public piDataService: PIDataService, 
      public piCalcService: PICalcService,
      private route: ActivatedRoute
   ) {}

   public loadData(data?: PIDataRaw[]): void {
      if (data) this.sourceData = data;

      let topData: PIDataRaw[] = this.sourceData.filter(tid => tid.pClass === this.topPClass);
      let midData: PIDataRaw[] = this.sourceData.filter(tid => tid.pClass === this.midPClass);
      let subData: PIDataRaw[] = this.sourceData.filter(tid => this.subPClass.includes(tid.pClass));

      let newSub: SubPIData[];
      this.data = [];

      for (let d of topData) {
         newSub = [];

         // input P3-1.P2-1
         let inpP3: PIDataRaw = midData.find(tid => tid.typeId == d.input1);
         let inpP2: PIDataRaw = subData.find(tid => tid.typeId == inpP3.input1);
         newSub.push(new SubPIData(
            inpP2.typeId,
            inpP2.name,
            inpP2.pClass,
            inpP2.sell,
            this.ratioP2Single
         ));

         // input P3-1.P2-2
         inpP2 = subData.find(tid => tid.typeId == inpP3.input2);
         newSub.push(new SubPIData(
            inpP2.typeId,
            inpP2.name,
            inpP2.pClass,
            inpP2.sell,
            this.ratioP2Single
         ));

         // input P3-1.P2-3 if it exists
         inpP2 = subData.find(tid => tid.typeId == inpP3.input3);
         if (inpP2) {
            newSub.push(new SubPIData(
               inpP2.typeId,
               inpP2.name,
               inpP2.pClass,
               inpP2.sell,
               this.ratioP2Single
            ));
         }

         // input P3-2.P2-1
         inpP3 = midData.find(tid => tid.typeId == d.input2);
         inpP2 = subData.find(tid => tid.typeId == inpP3.input1);
         newSub.push(new SubPIData(
            inpP2.typeId,
            inpP2.name,
            inpP2.pClass,
            inpP2.sell,
            this.ratioP2Single
         ));

         // input P3-2.P2-2
         inpP2 = subData.find(tid => tid.typeId == inpP3.input2);
         newSub.push(new SubPIData(
            inpP2.typeId,
            inpP2.name,
            inpP2.pClass,
            inpP2.sell,
            this.ratioP2Single
         ));

         // input P3-2.P2-3 if it exists
         inpP2 = subData.find(tid => tid.typeId == inpP3.input3);
         if (inpP2) {
            newSub.push(new SubPIData(
               inpP2.typeId,
               inpP2.name,
               inpP2.pClass,
               inpP2.sell,
               this.ratioP2Single
            ));
         }

         // input3 could be a P3 or a P1
         inpP3 = midData.find(tid => tid.typeId == d.input3);
         if (inpP3) {
            // input P3-3.P2-1
            inpP3 = midData.find(tid => tid.typeId == d.input3);
            inpP2 = subData.find(tid => tid.typeId == inpP3.input1);
            newSub.push(new SubPIData(
               inpP2.typeId,
               inpP2.name,
               inpP2.pClass,
               inpP2.sell,
               this.ratioP2Single
            ));

            // input P3-3.P2-2
            inpP2 = subData.find(tid => tid.typeId == inpP3.input2);
            newSub.push(new SubPIData(
               inpP2.typeId,
               inpP2.name,
               inpP2.pClass,
               inpP2.sell,
               this.ratioP2Single
            ));

            // input P3-3.P2-3 if it exists
            inpP2 = subData.find(tid => tid.typeId == inpP3.input3);
            if (inpP2) {
               newSub.push(new SubPIData(
                  inpP2.typeId,
                  inpP2.name,
                  inpP2.pClass,
                  inpP2.sell,
                  this.ratioP2Single
               ));
            }
         }
         else {
            let inpP1: PIDataRaw = subData.find(tid => tid.typeId == d.input3);
            newSub.push(new SubPIData(
               inpP1.typeId,
               inpP1.name,
               inpP1.pClass,
               inpP1.sell,
               this.ratioP1Single
            ));
         }

         // now add a sub for the costs of the product (sales and POCO taxes)
         newSub.push(new SubPIData(
            d.typeId,
            d.name,
            d.pClass,
            d.sell,
            1
         ))

         this.data.push(new PIData(
            d.typeId,
            d.name,
            d.pClass,
            d.sell,
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