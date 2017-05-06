import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { MarketOrder } from '../orders/orders';

import { REGIONS } from '../../static-data/locations'
import { LOCATIONS } from '../../static-data/locations'

declare const AWS: any;

export const ESI_BASE_URL: string = "https://esi.tech.ccp.is/latest";

export class EveType {
   constructor(
      public typeID: number,
      public typeName: string,
      public volume: number
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
                  data.Items[0].Volume
               ));
            }
            else {
               // step 3: pull from ESI
               let url: string = ESI_BASE_URL + "/universe/types/" + typeID + "/?datasource=tranquility&language=en-us"
               this.getTypeData(url).subscribe(
                  res => {
                     callback(new EveType(
                        res.type_id,
                        res.name,
                        res.volume
                     ));
                     // add to dynamoDB
                     this.saveNewDynamoItem(res);
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

   private saveNewDynamoItem(res: any): void {
      let params = {
         TableName: "EveTypeIDs",
         Item: {
            "TypeID": +res.type_id,
            "Name": res.name,
            "Volume": +res.volume
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
}