import { Component } from '@angular/core';
import { DataTableModule } from "angular2-datatable";

import { MarketService } from './market.service';
import { EveAPIService } from '../services/eve-api.service';

import { MarketItemCalc, MarketStat, MarketLocationStat } from './market';

import { IMPORT_ITEMS_ALL, IMPORT_ITEMS_DOCTRINE } from './import-items';

@Component({
   selector: 'market',
   templateUrl: './market.component.html'
})

export class MarketComponent {
   //importItems = IMPORT_ITEMS_DOCTRINE;
   importItems = IMPORT_ITEMS_ALL;

   constructor(public marketService: MarketService) {
      for (let g of this.importItems) {
         marketService.LoadMarketData(this.importItems);
      }
   }

   getNumLocations(): number {
      return this.marketService.locations.length;
   }

   calc(ms: MarketStat): void {
      let calc: MarketItemCalc = new MarketItemCalc();

      this.marketService.data.find(f => f.typeID == ms.typeID).profit = ms.impPrice - ms.expPrice
      ms.margin = ((ms.impPrice - ms.expPrice) / ms.expPrice) * 100;
      ms.profitPerM3 = (ms.impPrice - ms.expPrice) / ms.itemVolume;
   }

   fmt(val: number): String {
      if (val) return this.marketService.formatNumberString(val);
      return "";
   }

   fmtBig(val: number) {
      if (val) return (val / 1000000).toFixed(2) + "m";
      return "";
   }

   getItem(typeID: number): MarketStat {
      return this.marketService.data.find(f => f.typeID == typeID);
   }
}