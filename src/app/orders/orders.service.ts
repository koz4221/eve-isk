import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { MarketOrder } from './orders';

import { EveAPIService } from '../services/eve-api.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class OrdersService {
   public orders: MarketOrder[];

   private typeNames: { typeID: number, typeName: string }[] = [];

   private xml2js = require('xml2js').parseString;

   constructor(private http: Http, private eveAPI: EveAPIService) {}

   formatNumberString(num: number): string {    
      return (+num).toFixed(2);  
      // let fNum: string
      // num = +num;

      // // decimal precision
      // if (num < 1000 && num > -1000) {
      //    fNum = num.toFixed(2);
      // } else {
      //    fNum = num.toFixed(0);
      // }

      // // add commas for big numbers
      // fNum = fNum.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      // return fNum;
   }

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
                        "", // type name
                        p.$.price,
                        p.$.duration,
                        p.$.issued,
                        (p.$.bid == "1")
                     ))
                  }  
               })         
            });

            this.orders.map(o => {
               this.setTypeName(o);
               // get market data
               this.setTopMarketStats(o);
            })
         },
         error => console.log(error)
      )
   }

   private getOrderData(url: string): Observable<any> {
      return this.http.get(url).map((res:Response) => res);
   }

   private setTypeName(order: MarketOrder): void {
      let val;
      let name: string

      val = this.typeNames.find(p => p.typeID == order.typeID)

      if (val) { 
         this.orders.find(o => o.orderID == order.orderID).typeName = val.typeName;
      }
      else {
         this.eveAPI.getType(order.typeID, (data) => {
            this.orders.find(o => o.orderID == order.orderID).typeName = data.typeName;
            this.typeNames.push({ typeID: order.typeID, typeName: data.typeName });
         })
      }
   }

   private setTopMarketStats(order: MarketOrder): void {
      this.eveAPI.setTopMarketStats(order);
   }
}