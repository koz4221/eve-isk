import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PIData, PIData2, SubPIData } from './pi-data';

import { PIDataService } from './pi-data.service';
import { PICalcService } from './pi-calc.service';

import { POCOTax } from './pi-data';

@Component({
   moduleId: module.id,
   selector: 'p3-p4-table',
   templateUrl: './p3-p4-table.component.html',
   styleUrls: ['../css/pi-data.css']
})

export class P3toP4TableComponent implements OnInit {
   data: PIData2[] = [];
   sourceData: PIData[];
   topPClass: number = 4;
   subPClass: number = 3;
   ratioP3toP4: number = 18; // 18:1
   ratioP3Single: number = 6; // 18 / 3

   constructor(
      public piDataService: PIDataService, 
      public piCalcService: PICalcService,
      private route: ActivatedRoute
   ) {}

   ngOnInit(): void {
      let typeIDs = this.route.snapshot.data['typeIDs'].json();
      this.piDataService.loadPIDataByCallback(typeIDs, (data) => {
         this.sourceData = data;
         this.loadData();
         this.calculateCosts();
      });
   }

   public loadData(): void {
      let topData: PIData[] = this.sourceData.filter(tid => tid.pClass === this.topPClass);
      let subData: PIData[] = this.sourceData.filter(tid => tid.pClass === this.subPClass);

      let newSub: SubPIData[] = [];
      this.data = [];

      for (let d of topData) {
         let inpP3: PIData = subData.filter(tid => tid.typeId == d.input1)[0];
         newSub.push(new SubPIData(
            inpP3.typeId,
            inpP3.name,
            inpP3.pClass,
            inpP3.sell,
            this.ratioP3Single
         ));

         inpP3 = subData.filter(tid => tid.typeId == d.input2)[0];
         newSub.push(new SubPIData(
            inpP3.typeId,
            inpP3.name,
            inpP3.pClass,
            inpP3.sell,
            this.ratioP3Single
         ));

         inpP3 = subData.filter(tid => tid.typeId == d.input3)[0];
         newSub.push(new SubPIData(
            inpP3.typeId,
            inpP3.name,
            inpP3.pClass,
            inpP3.sell,
            this.ratioP3Single
         ));

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
   }

   public calculateCosts(): void {
      let POCOtax: number
      let feesAndTaxes: number = this.piCalcService.numSalBroTax

      for (let d of this.data) {
         d.inputCost = 0;
         for (let s of d.subdata.filter(p => p.pClass == this.subPClass)) {
            s.inputCost = (s.price * s.quantity);
            d.inputCost += s.inputCost
         }

         d.POCOCost = 0;
         for (let s of d.subdata) {
            POCOtax = this.piDataService.POCO_TAXES.find(p => p.pClass == s.pClass).tax
            s.POCOCost = s.quantity * POCOtax * (this.piCalcService.numPOCOTax / 100)
            if (s.pClass == this.subPClass) { s.POCOCost /= 2 }
            d.POCOCost += s.POCOCost
         }

         // only tax the end product because only the seller gets taxed
         d.taxCost = 0;
         for (let s of d.subdata.filter(p => p.pClass == this.topPClass)) {
            s.taxCost = s.price * s.quantity * (feesAndTaxes / 100);
            d.taxCost += s.taxCost
         }

         d.totalCost = d.inputCost + d.POCOCost + d.taxCost;
      }
   }

   public formatNumberString(num: number): string {
      if (num) return this.piCalcService.formatNumberString(num);
      return "";
   }
}