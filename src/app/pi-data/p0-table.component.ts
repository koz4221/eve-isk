import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PIData, PITypeID } from './pi-data';

import { PIDataService } from './pi-data.service';
import { PICalcService } from './pi-calc.service';

@Component({
   moduleId: module.id,
   selector: 'p0-table',
   templateUrl: './p0-table.component.html'
})

export class P0TableComponent implements OnInit {
   typeIDs: any[];
   data: PIData[] = [];

   EHeadsPerPlanet: number;

   constructor(
      public piDataService: PIDataService, 
      public piCalcService: PICalcService,
      private route: ActivatedRoute
   ) {}

   ngOnInit(): void {
      this.loadData();
   }

   loadData(): void {
      this.data = [];
      console.log("p0 val: " + this.piCalcService.CCUpgradeSkill);

      this.typeIDs = this.route.snapshot.data['typeIDs'].json()
         .filter(tid => tid.p_class === 0);
      
      for (let tid of this.typeIDs) {
         this.data.push(new PIData(tid.type_id, tid.type_name, tid.p_class, 0, 0));

         this.piDataService.getPIPriceData(tid.type_id).subscribe(
            res => {
               let prices = this.piDataService.extractMarketDataPrices(res);
               this.data.find(item => item.typeId == tid.type_id).jitaBuy = prices.buy;
               this.data.find(item => item.typeId == tid.type_id).jitaSell = prices.sell;
            },
            error => console.log(error)   
         );
      }

      this.EHeadsPerPlanet = this.piCalcService.getEHeadsPerPlanet();    
   }

   foo() {
      alert("foo!");
   }
}
