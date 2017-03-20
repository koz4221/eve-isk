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

    private data: PIData[] = [
        {typeId: 2073, name: "Microorganisms", pClass: 0, jitaBuy: 1.63, jitaSell: 2.00},
        {typeId: 2287, name: "Complex Organisms", pClass: 0, jitaBuy: 7.25, jitaSell: 7.41}
    ]

    private dataUrl: string = "https://esi.tech.ccp.is/latest/markets/10000002/orders/?datasource=tranquility&order_type=all&page=1&type_id=";

    constructor(private http: Http) {}

    getPIData(): PIData[] { return this.data; }

    getP0PriceData(typeID: number): Observable<any> {
       return this.http.get(this.dataUrl + typeID)
         .map(this.extractData);
    }

    extractData(res: Response) {
      let body = res.json();
      return body || { };
   }

   public extractMarketDataPrices(data): { buy: number, sell: number } {
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
