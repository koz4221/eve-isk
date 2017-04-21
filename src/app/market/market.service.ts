import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { MarketStat, MarketLocationStat } from './market'
import { LOCATIONS } from '../../static-data/locations'

import { EveAPIService } from '../services/eve-api.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class MarketService {
   public data: MarketStat[] = [];
   public locations: string[] = ["jita", "amarr", "catch"];

   private urlBase: string = "https://esi.tech.ccp.is/latest/markets/"

   constructor(private http: Http, private eveAPI: EveAPIService) {}

   public LoadMarketData(typeIDs: number[]): void {
      this.data = [];
      let mls: MarketLocationStat;
      let url: string = this.urlBase// + LOCATIONS.find(p => p.code == this.prices).regionID + "/orders/?datasource=tranquility&order_type=all&type_id="

      for (let tid of typeIDs) {
         let ms: MarketStat = new MarketStat(tid, "", new Array<MarketLocationStat>());

         for (let loc of this.locations) {
            let regionID: number = LOCATIONS.find(p => p.code == loc).regionID;
            let locationID: number = LOCATIONS.find(p => p.code == loc).locationID;
            url = this.urlBase + regionID + "/orders/?datasource=tranquility&order_type=all&type_id=" + tid

            this.http.get(url).map((data) => {
               let body = data.json();
               return body || { };
            }).subscribe(
               res => {
                  mls = this.parseAndCreateMarketStatData(res, locationID, regionID);
                  ms.stats.push(mls);
               },
               error => {
                  console.log(error);
               }
            )
         }

         this.data.push(ms);
      }

   }

   private parseAndCreateMarketStatData(data: any, lid: number, rid: number): MarketLocationStat {
      let locName: string = LOCATIONS.find(l => l.locationID == lid).name
      let mls: MarketLocationStat = new MarketLocationStat(lid, locName, rid, 0);
      let price: number = 0;

      data = data.filter(f => f.is_buy_order == false);

      for (let stat of data) {
         if (stat.price > price) { price = stat.price; };
      }

      mls.price = price;
      return mls;
   }
}