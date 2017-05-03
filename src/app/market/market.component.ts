import { Component } from '@angular/core';

import { MarketService } from './market.service';
import { EveAPIService } from '../services/eve-api.service';

import { MarketItemCalc, MarketStat, MarketLocationStat } from './market';

import { IMPORT_ITEMS } from './import-items';

@Component({
   selector: 'market',
   templateUrl: './market.component.html'
})

export class MarketComponent {
   importItems = IMPORT_ITEMS;

   constructor(public marketService: MarketService) {
      for (let g of this.importItems) {
         marketService.LoadMarketData(g.items);
      }
   }

   getNumLocations(): number {
      return this.marketService.locations.length;
   }

   calc(typeID: number): MarketItemCalc {
      let ms: MarketStat = this.getItem(typeID);
      let calc: MarketItemCalc = new MarketItemCalc();

      calc.profit = this.marketService.formatNumberString(ms.stats[0].price - ms.stats[1].price)
      calc.margin = this.marketService.formatNumberString(((ms.stats[0].price - ms.stats[1].price) / ms.stats[1].price) * 100);
      calc.profitPerM3 = this.marketService.formatNumberString((ms.stats[0].price - ms.stats[1].price) / ms.itemVolume);

      return calc;
   }

   fmt(val: number) {
      return this.marketService.formatNumberString(val);
   }

   getItem(typeID: number): MarketStat {
      return this.marketService.data.find(f => f.typeID == typeID);
   }
}