import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { MarketOrder } from '../orders/orders';

import { REGIONS } from '../../static-data/locations'
import { LOCATIONS } from '../../static-data/locations'
import { SHIP_PACKAGED_VOLUMES } from '../../static-data/eve-static'

declare const AWS: any;

export const ESI_BASE_URL: string = "https://esi.tech.ccp.is/latest";

export class EveType {
   constructor(
      public typeID: number,
      public typeName: string,
      public volume: number,
      public groupID: number,
      public categoryID: number
   ){}
}

export class ItemMarketHistory {
   constructor (
      public typeID: number,
      public avgVol7Day: number,
      public avgVol30Day: number,
      public avgPrice: number
   ){}
}

@Injectable()
export class EveAPIService {
   private dynamoClient;

   constructor(private http: Http) {
      AWS.config.update({
         region: "us-east-1",
         accessKeyId: "AKIAJLSASLDIMDMGUCLA",
         secretAccessKey: "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"
      });

      this.dynamoClient = new AWS.DynamoDB.DocumentClient();
   }

   public getType(typeID: number, callback: (type: EveType) => void): void {
      // step 1: check cache
      //console.log(typeID);

      // step 2: check AWS DynamoDB
      let params = {
         TableName : "EveTypeIDs",
         KeyConditionExpression: "#TypeID = :tid",
         ExpressionAttributeNames:{
            "#TypeID": "TypeID"
         },
         ExpressionAttributeValues: {
            ":tid": +typeID
         }
      }

      this.dynamoClient.query(params, (err, data) => {
         if (err) {
            console.log(err);
         } 
         else {
            if (data.Items.length > 0) {
               callback(new EveType(
                  data.Items[0].TypeID,
                  data.Items[0].Name,
                  data.Items[0].Volume,
                  data.Items[0].GroupID,
                  data.Items[0].CategoryID
               ));
            }
            else {
               // step 3: pull from ESI
               let url: string = ESI_BASE_URL + "/universe/types/" + typeID + "/?datasource=tranquility&language=en-us"
               this.getTypeData(url).subscribe(
                  res => {
                     let vol = res.volume;
                     if (SHIP_PACKAGED_VOLUMES.some(p => p.groupID == res.group_id)) {
                        vol = SHIP_PACKAGED_VOLUMES.find(p => p.groupID == res.group_id).packagedVol;
                     }

                     let et = new EveType(
                        res.type_id,
                        res.name,
                        vol,
                        res.group_id,
                        0
                     );

                     // need to get categoryID which requires a separate call
                     url = ESI_BASE_URL + "/universe/groups/" + res.group_id + "/?datasource=tranquility&language=en-us"
                     this.getTypeData(url).subscribe(
                        res => {
                           et.categoryID = res.category_id;

                           callback(et);
                           // add to dynamoDB
                           this.saveNewDynamoItem(et);
                        },
                        error => {
                           console.log(error);
                           callback(undefined);
                        }
                     )
                  },
                  error => { 
                     console.log(error);
                     callback(undefined);
                  }
               )
            }
         }
      })
   }

   getTypeData(url: string): Observable<any> {
      return this.http.get(url)
         .map(this.extractData);
   } 

   extractData(res: Response) {
      let body = res.json();
      return body || { };
   }

   private saveNewDynamoItem(et: EveType): void {
      let params = {
         TableName: "EveTypeIDs",
         Item: {
            "TypeID": et.typeID,
            "Name": et.typeName,
            "Volume": et.volume,
            "GroupID": et.groupID,
            "CategoryID": et.categoryID
         }
      };

      this.dynamoClient.put(params, (err, data) => {
         if (err) { console.log(err); }
      })
   }

   public setTopMarketStats(order: MarketOrder): void {
      let regionID: number = LOCATIONS.find(p => p.locationID == order.stationID).regionID;
      let url: string = ESI_BASE_URL + "/markets/" + regionID + "/orders/?datasource=tranquility&order_type=all&type_id=" + order.typeID

      this.http.get(url).map((data) => {
         let body = data.json();
         return body || { };
      }).subscribe(
         res => {
            // restrict orders to only the station since that's the main competition
            res = res.filter(f => f.location_id == order.stationID)
            this.parseAndSetMarketStatData(res, order);
         },
         error => {
            console.log(error);
         }
      )
   }

   private parseAndSetMarketStatData(data: any, order: MarketOrder): void {
      let topOrderID: number = order.orderID;
      let topPrice: number = order.price;
      let topNumOrders: number = 0;
      let topVol: number = 0;

      data = data.filter(f => f.is_buy_order === order.isBuyOrder);

      for (let stat of data) {
         if (order.isBuyOrder == true) {
            if (stat.price > order.price) {
               topNumOrders++;
               topVol += stat.volume_remain;
            }

            if (stat.price > topPrice) {
               topOrderID = stat.order_id;
               topPrice = stat.price;
            }
         }
         else {
            if (stat.price < order.price) {
               topNumOrders++;
               topVol += stat.volume_remain;
            }

            if (stat.price < topPrice) {
               topOrderID = stat.order_id;
               topPrice = stat.price;
            }
         }
      }

      order.topOrderID = topOrderID;
      order.topPrice = topPrice;
      order.topNumOrders = topNumOrders;
      order.topVolume = topVol;
   }

   public createMarketHistoryStats(typeID: number, callback: (data: ItemMarketHistory) => void): void {
      let regionID: number = LOCATIONS.find(f => f.code == "catch").regionID
      let url: string = ESI_BASE_URL + "/markets/" + regionID + "/history/?datasource=tranquility&type_id=" + typeID

      let date: Date
      let vol7day: number = 0;
      let avgPrice: number = 0;
      
      this.http.get(url).map((data) => {
         let body = data.json();
         return body || { };
      }).subscribe(
         res => {
            for (let r of res) {
               date = new Date(r.date);
               if ((date.getTime() + this.daysInMiliseconds(7)) >= (Date.now() - this.daysInMiliseconds(1))) {
                  vol7day += r.volume;
                  avgPrice += r.average;
               }
            }

            callback(new ItemMarketHistory(
               2205,
               vol7day / 7,
               0,
               avgPrice / 7
            ));
         },
         error => {
            console.log(error);
         }
      )
   }

   private daysInMiliseconds(days: number): number {
      return days * 24 * 60 * 60 * 1000;
   }

   public getAllTypes(callback: (data: number[]) => void): void {
      let types: number[] = [];
      let url: string
      let totalPages: number = 1 // currently stops at page 33
      let pagesComplete: number = 0

      for (let page: number = 1; page <= totalPages; page++) {
         url = ESI_BASE_URL + "/universe/types/?datasource=tranquility&page=" + page

         this.http.get(url).map((data) => {
            let body = data.json();
            return body || {};
         }).subscribe(
            res => {
               res.map(m => {
                  types.push(m);
               })

               pagesComplete++;
               if (pagesComplete >= totalPages) {
                  callback(types);
               }
            }
         )
      }

   }

   public getAllTypes2(callback: (data: number[]) => void): void {
      let types: number[] = [];
      let url: string
      let totalPages: number = 2 // currently stops at page 33
      let pagesComplete: number = 0

      for (let page: number = 1; page <= totalPages; page++) {
         url = ESI_BASE_URL + "/markets/10000014/orders/?datasource=tranquility&order_type=sell&page=" + page

         this.http.get(url).map((data) => {
            let body = data.json();
            return body || {};
         }).subscribe(
            res => {
               res = res.filter(f => f.location_id == 61000182);
               res.map(m => {
                  if (!types.some(s => s == m.type_id)) {
                     types.push(m.type_id);
                  }
               })

               console.log(types.length);
               pagesComplete++;
               if (pagesComplete >= totalPages) {
                  callback(types.slice(1800, 2000));
               }
            }
         )
      }
   }
}