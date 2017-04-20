import { Component } from '@angular/core';

import { MarketService } from './market.service';

@Component({
   selector: 'market',
   templateUrl: './market.component.html'
})

export class MarketComponent {
   constructor(public marketService: MarketService) {
      marketService.LoadMarketData([2205]);
   }

   getNumLocations(): number {
      return this.marketService.locations.length;
   }
}