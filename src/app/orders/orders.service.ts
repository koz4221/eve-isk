import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { MarketOrder } from './orders';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class OrdersService {
   public orders: MarketOrder[];
   private xml2js = require('xml2js').parseString;

   constructor(private http: Http) {}

   loadOrders(): void {
      this.orders = [];
      let url: string = "https://api.eveonline.com/char/MarketOrders.xml.aspx?keyID=6138010&vCode=hsyZWl5yV8HGG7oz2QZW6z1QA1juV4y2BkwUGQQ1uRkdhm2Z1PUmrmigsLpDGkSm"

      this.getOrderData(url).subscribe(
         res => {
            this.xml2js(res._body, (err, res) => {
               res.eveapi.result[0].rowset[0].row.map(p => {
                  if (p.$.orderState == 0) {
                     this.orders.push(new MarketOrder(
                        p.$.orderID,
                        p.$.charID,
                        p.$.stationID,
                        p.$.volEntered,
                        p.$.volRemaining,
                        p.$.orderState,
                        p.$.typeID,
                        p.$.price,
                        p.$.duration,
                        p.$.issued,
                        p.$.bid
                     ))
                  }  
               })
            });
         },
         error => console.log(error)
      )
   }

   private getOrderData(url: string): Observable<any> {
      return this.http.get(url).map((res:Response) => res);
   }
}