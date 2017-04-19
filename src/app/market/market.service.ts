import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { MarketStat, MarketLocationStat } from './market'
import { LOCATIONS } from '../../static-data/locations'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class MarketService {
   public data: MarketStat[] = [];
   public locations: string[] = ["jita", "amarr", "catch"];

   private urlBase: string = "https://esi.tech.ccp.is/latest/markets/"

   public LoadMarketData(typeIDs: number[]): void {
      this.data = [];
      let url: string = this.urlBase// + LOCATIONS.find(p => p.code == this.prices).regionID + "/orders/?datasource=tranquility&order_type=all&type_id="

      for (let tid in typeIDs) {
         let ms: MarketStat = new MarketStat(+tid, "", new MarketLocationStat[this.locations.length])

         for (let loc of this.locations) {
            let regionID: number = LOCATIONS.find(p => p.code == loc).regionID;
            url = this.urlBase + regionID + "/orders/?datasource=tranquility&order_type=all&type_id=" + tid

            
         }
      }

   }
}