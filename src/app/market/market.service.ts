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
   public locations: string[] = ["catch", "jita"];

   private urlBase: string = "https://esi.tech.ccp.is/latest/markets/"

   constructor(private http: Http, private eveAPI: EveAPIService) {
      this.data = [];
   }

   public LoadMarketData(typeIDs: number[]): void {
      let mls: MarketLocationStat;
      let url: string = this.urlBase// + LOCATIONS.find(p => p.code == this.prices).regionID + "/orders/?datasource=tranquility&order_type=all&type_id="

      for (let tid of typeIDs) {
         if (this.data.filter(f => f.typeID == tid).length == 0) {
            let ms: MarketStat = new MarketStat(tid, "", 1, 0, 0, new Array<MarketLocationStat>());

            for (let loc of this.locations) {
               let regionID: number = LOCATIONS.find(p => p.code == loc).regionID;
               let locationID: number = LOCATIONS.find(p => p.code == loc).locationID;
               let mls: MarketLocationStat = new MarketLocationStat(locationID, "", regionID, 0, 0, 0);
               let stat: MarketLocationStat;
               url = this.urlBase + regionID + "/orders/?datasource=tranquility&order_type=all&type_id=" + tid

               ms.stats.push(mls);

               this.http.get(url).map((data) => {
                  let body = data.json();
                  return body || { };
               }).subscribe(
                  res => {
                     res = res.filter(p => p.location_id == locationID);
                     stat = this.parseAndCreateMarketStatData(res, locationID, regionID);
                     mls = ms.stats.find(item => item.locationID == stat.locationID);
                     mls.locationName = stat.locationName;
                     mls.price = stat.price;
                     mls.totVolume = stat.totVolume;
                     mls.totOrders = stat.totOrders;
                  },
                  error => {
                     console.log(error);
                  }
               )
            }

            this.eveAPI.getType(tid, (data) => {
               ms.typeName = data.typeName;
               ms.itemVolume = data.volume;
            })

            this.eveAPI.createMarketHistoryStats(tid, (data) => {
               ms.avgVol7Day = data.avgVol7Day;
            })

            this.data.push(ms);
         }
      }
   }

   private parseAndCreateMarketStatData(data: any, lid: number, rid: number): MarketLocationStat {
      let locName: string = LOCATIONS.find(l => l.locationID == lid).name
      let locCode: string = LOCATIONS.find(l => l.locationID == lid).code
      let price: number = 0;
      let volume: number = 0;
      let orders: number = 0;

      data = data.filter(f => f.is_buy_order == false);

      for (let stat of data) {
         if (stat.price < price || price == 0) { price = stat.price; };
         
         if (locCode == "catch") {
            volume += Number(stat.volume_remain);
            orders++;
         }
      }

      return new MarketLocationStat(lid, locName, rid, price, volume, orders);
   }

   formatNumberString(num: number): string {
      let fNum: string

      // decimal precision
      if (num < 1000 && num > -1000) {
         fNum = num.toFixed(2);
      } else {
         fNum = num.toFixed(0);
      }

      // add commas for big numbers
      fNum = fNum.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      return fNum;
   }
}