import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { PIData } from './pi-data';

import { REGIONS } from '../../static-data/locations'
import { LOCATIONS } from '../../static-data/locations'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PIDataService {
   public prices: string;

   urlBase: string = "https://esi.tech.ccp.is/latest/markets/"
   data: PIData[] = [];

   constructor(private http: Http) {}

   getPIData(): PIData[] { return this.data; }

   getPIDataByTypeID(typeID: number): PIData { 
      return this.data.filter(tid => tid.typeId === typeID)[0];
   }

   loadPIData(typeIDs: any[]): void {
      this.data = [];
      let url: string = this.urlBase + LOCATIONS.find(p => p.code == this.prices).regionID + "/orders/?datasource=tranquility&order_type=all&type_id="
      console.log(url);
            
      for (let tid of typeIDs) {
         this.data.push(new PIData(tid.type_id, tid.type_name, tid.p_class, 0, 0, tid.input1_type_id, tid.input2_type_id, tid.input3_type_id));

         this.getPIPriceData(url, tid.type_id).subscribe(
            res => {
               res = res.filter(p => p.location_id == LOCATIONS.find(p => p.code == this.prices).locationID)
               let prices = this.extractMarketDataPrices(res);
               this.data.find(item => item.typeId == tid.type_id).buy = prices.buy;
               this.data.find(item => item.typeId == tid.type_id).sell = prices.sell;
            },
            error => console.log(error)   
         );
      }
   }

   getPIPriceData(url: string, typeID: number): Observable<any> {
      return this.http.get(url + typeID)
      .map(this.extractData);
   }

    extractData(res: Response) {
      let body = res.json();
      return body || { };
   }

   extractMarketDataPrices(data): { buy: number, sell: number } {
      // this gets the lowest sell price and highest buy price from a list of orders from Eve ESI
      let sellValue: number = 0
      let buyValue: number = 0

      for (let order of data) {
         if (order.is_buy_order == false) {
            // sell
            if (order.price < sellValue || sellValue == 0) sellValue = order.price;
         } else {
            // buy
            if (order.price > buyValue || buyValue == 0) buyValue = order.price;
         }
      }

      return { buy: buyValue, sell: sellValue };
   }
}
