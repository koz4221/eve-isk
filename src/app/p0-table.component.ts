import { Component, OnInit } from '@angular/core';

import { PIData } from './pi-data';

import { PIDataService } from './pi-data.service';
import { PICalcService } from './pi-calc.service';

@Component({
   moduleId: module.id,
   selector: 'p0-table',
   templateUrl: './p0-table.component.html'
})

export class P0TableComponent implements OnInit {
   data: PIData[] = [];

   constructor(
      public piDataService: PIDataService, 
      public piCalcService: PICalcService
   ) {}

   ngOnInit(): void {
      this.data = this.piDataService.getPIData();
      
      this.piDataService.getP0PriceData().subscribe(
         res => {
            let prices = this.piDataService.extractMarketDataPrices(res);
            this.data.push(new PIData(2073, "Unknown", 0, prices.sell, prices.buy));
         },
         error => console.log(error)   
      );
   }
}
