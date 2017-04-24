import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { PIData, PIData2, SubPIData } from './pi-data';

import { REGIONS } from '../../static-data/locations'
import { LOCATIONS } from '../../static-data/locations'
import { POCOTax } from './pi-data';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PIDataService {
   public prices: string;

   urlBase: string = "https://esi.tech.ccp.is/latest/markets/"
   data: PIData[] = [];

   public POCO_TAXES: POCOTax[] = [
      { pClass: 0, tax: 5 },
      { pClass: 1, tax: 400 },
      { pClass: 2, tax: 7200 },
      { pClass: 3, tax: 60000 },
      { pClass: 4, tax: 1200000 }
   ];

   constructor(private http: Http) {}

   getPIData(): PIData[] { return this.data; }

   getPIDataByTypeID(typeID: number): PIData { 
      return this.data.filter(tid => tid.typeId === typeID)[0];
   }

   loadPIData(typeIDs: any[]): void {
      this.data = [];
      let url: string = this.urlBase + LOCATIONS.find(p => p.code == this.prices).regionID + "/orders/?datasource=tranquility&order_type=all&type_id="
            
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

   loadPIDataByCallback(typeIDs: any[], callback: (data: PIData[]) => void): void {
      let data: PIData[] = [];
      let url: string = this.urlBase + LOCATIONS.find(p => p.code == this.prices).regionID + "/orders/?datasource=tranquility&order_type=all&type_id="
      let iter: number = 0;
            
      for (let tid of typeIDs) {
         data.push(new PIData(tid.type_id, tid.type_name, tid.p_class, 0, 0, tid.input1_type_id, tid.input2_type_id, tid.input3_type_id));

         this.getPIPriceData(url, tid.type_id).subscribe(
            res => {
               res = res.filter(p => p.location_id == LOCATIONS.find(p => p.code == this.prices).locationID)
               let prices = this.extractMarketDataPrices(res);
               data.find(item => item.typeId == tid.type_id).buy = prices.buy;
               data.find(item => item.typeId == tid.type_id).sell = prices.sell;

               iter++;
               if (iter >= typeIDs.length) {
                  callback(data);
               }
            },
            error => {
               console.log(error)
               iter++;
               if (iter >= typeIDs.length) {
                  callback(data);
               }
            }   
         );
      }
   }

   loadP4Data(topPClass: number, subPClass: number[], ratio1: number, ratio2: number): PIData2[] {
      let topData: PIData[] = this.data.filter(tid => tid.pClass === topPClass);
      let subData: PIData[] = this.data.filter(tid => subPClass.includes(tid.pClass));

      let newSub: SubPIData[];
      let newData: PIData2[] = [];

      for (let d of topData) {
         let inpP3: PIData = subData.filter(tid => tid.typeId == d.input1)[0];
         newSub = [];
         newSub.push(new SubPIData(
            inpP3.typeId,
            inpP3.name,
            inpP3.pClass,
            inpP3.sell,
            ratio1
         ));

         inpP3 = subData.filter(tid => tid.typeId == d.input2)[0];
         newSub.push(new SubPIData(
            inpP3.typeId,
            inpP3.name,
            inpP3.pClass,
            inpP3.sell,
            ratio1
         ));

         // input3 could be a P3 or a P1
         inpP3 = subData.filter(tid => tid.typeId == d.input3)[0];
         newSub.push(new SubPIData(
            inpP3.typeId,
            inpP3.name,
            inpP3.pClass,
            inpP3.sell,
            (inpP3.pClass == 3) ? ratio1 : ratio2
         ));

         // now add a sub for the costs of the product (sales and POCO taxes)
         newSub.push(new SubPIData(
            d.typeId,
            d.name,
            d.pClass,
            d.sell,
            1
         ))

         newData.push(new PIData2(
            d.typeId,
            d.name,
            d.pClass,
            d.sell,
            1,
            newSub
         ))
      }

      return newData;
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
