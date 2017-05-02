import { Component } from '@angular/core';

import { MarketService } from './market.service';
import { EveAPIService } from '../services/eve-api.service';

import { MarketItemCalc, MarketStat, MarketLocationStat } from './market';

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

   calc(ms: MarketStat): MarketItemCalc {
      let calc: MarketItemCalc = new MarketItemCalc();
      calc.profit = this.marketService.formatNumberString(ms.stats[0].price - ms.stats[1].price)
      calc.margin = this.marketService.formatNumberString(((ms.stats[0].price - ms.stats[1].price) / ms.stats[1].price) * 100);

      return calc;
   }
}