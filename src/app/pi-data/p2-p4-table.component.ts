import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PIData, PIData2, SubPIData } from './pi-data';

import { PIDataService } from './pi-data.service';
import { PICalcService } from './pi-calc.service';

import { POCOTax } from './pi-data';

@Component({
   moduleId: module.id,
   selector: 'p2-p4-table',
   templateUrl: './p2-p4-table.component.html',
   styleUrls: ['../css/pi-data.css']
})

export class P2toP4TableComponent implements OnInit {
   data: PIData2[] = [];
   sourceData: PIData[];
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

         // input P3-1.P2-1
         let inpP3: PIData = midData.find(tid => tid.typeId == d.input1);
         let inpP2: PIData = subData.find(tid => tid.typeId == inpP3.input1);
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
            let inpP1: PIData = subData.find(tid => tid.typeId == d.input3);
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