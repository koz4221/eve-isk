import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { MarketStat, MarketLocationStat } from './market'
import { LOCATIONS } from '../../static-data/locations'
import { IMPORT_ITEMS_DOCTRINE } from './import-items'

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

   public loadMarketData(typeIDs: number[]): void {
      let mls: MarketLocationStat;
      let url: string = this.urlBase// + LOCATIONS.find(p => p.code == this.prices).regionID + "/orders/?datasource=tranquility&order_type=all&type_id="

      for (let tid of typeIDs) {
         if (this.data.filter(f => f.typeID == tid).length == 0) {
            let ms: MarketStat = new MarketStat(tid);
            
            for (let i = 0; i < this.locations.length; i++) {
               let isImport: boolean;
               let loc: string = this.locations[i];

               // import = 0, export = 1
               if (i == 0) { isImport = true; }
               else { isImport = false; }

               let regionID: number = LOCATIONS.find(p => p.code == loc).regionID;
               let locationID: number = LOCATIONS.find(p => p.code == loc).locationID;
               let mls: MarketLocationStat = new MarketLocationStat(locationID, "", regionID, 0, 0, 0);
               let stat: MarketLocationStat;
               url = this.urlBase + regionID + "/orders/?datasource=tranquility&order_type=all&type_id=" + tid

               this.http.get(url).map((data) => {
                  let body = data.json();
                  return body || { };
               }).subscribe(
                  res => {
                     res = res.filter(p => p.location_id == locationID);
                     stat = this.parseAndCreateMarketStatData(res, locationID, regionID);

                     if (isImport) {
                        ms.impPrice = stat.price;
                        ms.impVolume = stat.totVolume;
                        ms.impOrders = stat.totOrders;
                        ms.profit = ms.impPrice - ms.expPrice;
                        ms.profitPerM3 = (ms.impPrice - ms.expPrice) / ms.itemVolume;
                        ms.margin = ((ms.impPrice - ms.expPrice) / ms.expPrice) * 100;
                     }
                     else {
                        ms.expPrice = stat.price;
                        ms.profit = ms.impPrice - ms.expPrice;
                        ms.profitPerM3 = (ms.impPrice - ms.expPrice) / ms.itemVolume;
                        ms.margin = ((ms.impPrice - ms.expPrice) / ms.expPrice) * 100;
                     }
                  },
                  error => {
                     console.log(error);
                  }
               )
            }

            this.eveAPI.getType(tid, (data) => {
               ms.typeName = data.typeName;
               ms.itemVolume = data.volume;
               ms.profitPerM3 = (ms.impPrice - ms.expPrice) / ms.itemVolume;
            })

            this.eveAPI.createMarketHistoryStats(tid, (data) => {
               ms.avgVol7Day = data.avgVol7Day;
               ms.avgPrice = data.avgPrice;
               ms.avgRevenue = data.avgVol7Day * data.avgPrice;
            })

            // populate doctrines string
            for (let doc of IMPORT_ITEMS_DOCTRINE) {
               if (doc.items.some(s => s == ms.typeID)) {
                  ms.doctrines += doc.nickname + ", ";
               }
            }
            if (ms.doctrines.length > 0) {
               ms.doctrines = ms.doctrines.slice(0, ms.doctrines.length - 2);
            }

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

   public loadAllTypes(): void {
      this.eveAPI.getAllTypes2((data) => {
         this.loadMarketData(data);
      });
   }
}