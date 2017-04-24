import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PIData, PIData2, SubPIData } from './pi-data';

import { PIDataService } from './pi-data.service';
import { PICalcService } from './pi-calc.service';

import { POCOTax } from './pi-data';

@Component({
   moduleId: module.id,
   selector: 'p1-p3',
   templateUrl: './p1-p3.component.html',
   styleUrls: ['../css/pi-data.css']
})

export class P1toP3Component implements OnInit {
   data: PIData2[] = [];
   sourceData: PIData[];
   typeIDs: any;
   topPClass: number = 3;
   midPClass: number = 2;
   subPClass: number[] = [1];
   ratioP1Single: number = 26.67; // 120 / 6
   show: number = 0;

   constructor(
      public piDataService: PIDataService, 
      public piCalcService: PICalcService,
      private route: ActivatedRoute
   ) {}

   ngOnInit(): void {
      this.typeIDs = this.route.snapshot.data['typeIDs'].json();
      this.fullLoadData();
   }

   public fullLoadData(): void {
      this.piDataService.loadPIDataByCallback(this.typeIDs, (data) => {
         this.sourceData = data;
         this.loadData();
      });
   }

   public loadData(): void {
      let topData: PIData[] = this.sourceData.filter(tid => tid.pClass === this.topPClass);
      let midData: PIData[] = this.sourceData.filter(tid => tid.pClass === this.midPClass);
      let subData: PIData[] = this.sourceData.filter(tid => this.subPClass.includes(tid.pClass));

      let newSub: SubPIData[];
      this.data = [];

      for (let d of topData) {
         newSub = [];

         // input P2-1.P1-1
         let inpP3: PIData = midData.find(tid => tid.typeId == d.input1);
         let inpP2: PIData = subData.find(tid => tid.typeId == inpP3.input1);
         newSub.push(new SubPIData(
            inpP2.typeId,
            inpP2.name,
            inpP2.pClass,
            inpP2.sell,
            this.ratioP1Single
         ));

         // input P2-1.P1-2
         inpP2 = subData.find(tid => tid.typeId == inpP3.input2);
         newSub.push(new SubPIData(
            inpP2.typeId,
            inpP2.name,
            inpP2.pClass,
            inpP2.sell,
            this.ratioP1Single
         ));

         // input P2-2.P1-1
         inpP3 = midData.find(tid => tid.typeId == d.input2);
         inpP2 = subData.find(tid => tid.typeId == inpP3.input1);
         newSub.push(new SubPIData(
            inpP2.typeId,
            inpP2.name,
            inpP2.pClass,
            inpP2.sell,
            this.ratioP1Single
         ));

         // input P2-2.P1-2
         inpP2 = subData.find(tid => tid.typeId == inpP3.input2);
         newSub.push(new SubPIData(
            inpP2.typeId,
            inpP2.name,
            inpP2.pClass,
            inpP2.sell,
            this.ratioP1Single
         ));

         // input P2-3.P1-1 if it exists
         inpP3 = midData.find(tid => tid.typeId == d.input3);
         if (inpP3) {
            inpP2 = subData.find(tid => tid.typeId == inpP3.input1);
            newSub.push(new SubPIData(
               inpP2.typeId,
               inpP2.name,
               inpP2.pClass,
               inpP2.sell,
               this.ratioP1Single
            ));

            // input P2-3.P1-2
            inpP2 = subData.find(tid => tid.typeId == inpP3.input2);
            newSub.push(new SubPIData(
               inpP2.typeId,
               inpP2.name,
               inpP2.pClass,
               inpP2.sell,
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

         this.data.push(new PIData2(
            d.typeId,
            d.name,
            d.pClass,
            d.sell,
            1,
            newSub
         ))
      }

      this.piCalcService.calculateP4Costs(this.data, this.topPClass, this.subPClass);
   }

   public formatNumberString(num: number): string {
      if (num) return this.piCalcService.formatNumberString(num);
      return "";
   }
}