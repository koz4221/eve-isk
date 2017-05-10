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
   importCats = IMPORT_ITEMS_ALL;
   collapseStates: { code: string, isCollapsed: boolean }[] = [];

   constructor(public marketService: MarketService) {
      // //this.marketService.loadAllTypes();
      // for (let g of this.importItems) {
      //    //marketService.loadMarketData(this.importItems);
      // }
      for (let cat of this.importCats) {
         this.collapseStates.push({code: cat.code, isCollapsed: true});
      }
   }

   loadData(code: string): void {
      let importItems = this.importCats.find(f => f.code == code).items
      for (let g of importItems) {
         this.marketService.loadMarketData(importItems);
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

   flipCollapsed(code: string): void {
      this.collapseStates.find(f => f.code == code).isCollapsed = !this.getCollapsed(code);
   }

   getCollapsed(code: string): boolean {
      return this.collapseStates.find(f => f.code == code).isCollapsed;
   }

   getMarketData(code: string): MarketStat[] {
      let items: number[] = this.importCats.find(f => f.code == code).items;
      return this.marketService.data.filter(f => items.some(s => s == f.typeID));
   }
}