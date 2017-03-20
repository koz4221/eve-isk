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

   constructor(
      public piDataService: PIDataService, 
      public piCalcService: PICalcService,
      private route: ActivatedRoute
   ) {}

   ngOnInit(): void {
      this.typeIDs = this.route.snapshot.data['typeIDs'].json()
         .filter(tid => tid.p_class === 0);
      
      for (let tid of this.typeIDs) {
         this.piDataService.getP0PriceData(tid.type_id).subscribe(
            res => {
               let prices = this.piDataService.extractMarketDataPrices(res);
               this.data.push(new PIData(tid.type_id, tid.type_name, tid.p_class, prices.sell, prices.buy));
            },
            error => console.log(error)   
         );
      }


   }
}
