import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { PIData } from './pi-data';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const PI_P0_TYPEIDS: number[] = [
    2073, 2287
]

@Injectable()
export class PIDataService {
   dataUrl: string = "https://esi.tech.ccp.is/latest/markets/10000002/orders/?datasource=tranquility&order_type=all&page=1&type_id=";
   data: PIData[] = [];

   constructor(private http: Http) {}

   getPIData(): PIData[] { return this.data; }

   loadPIData(typeIDs: any[]): void {
      this.data = [];
            
      for (let tid of typeIDs) {
         this.data.push(new PIData(tid.type_id, tid.type_name, tid.p_class, 0, 0));

         this.getPIPriceData(tid.type_id).subscribe(
            res => {
               let prices = this.extractMarketDataPrices(res);
               this.data.find(item => item.typeId == tid.type_id).jitaBuy = prices.buy;
               this.data.find(item => item.typeId == tid.type_id).jitaSell = prices.sell;
            },
            error => console.log(error)   
         );
      }
   }

   getPIPriceData(typeID: number): Observable<any> {
      return this.http.get(this.dataUrl + typeID)
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
