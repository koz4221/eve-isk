import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

declare const AWS: any;

export const ESI_BASE_URL: string = "https://esi.tech.ccp.is/latest";

@Injectable()
export class EveAPIService {
   private dynamoClient;

   constructor(private http: Http) {
      AWS.config.update({
         region: "us-east-1",
         accessKeyId: "AKIAJLSASLDIMDMGUCLA",
         secretAccessKey: "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"
      });

      console.log(111);
      //this.dynamoClient = new AWS.DynamoDB.DocumentClient();
   }

   public getTypeName(typeID: number): string {
      // step 1: check cache

      // step 2: check AWS DynamoDB
      let params = {
         TableName : "EveTypeIDs",
         KeyConditionExpression: "#TypeID = :tid",
         ExpressionAttributeNames:{
            "#TypeID": "TypeID"
         },
         ExpressionAttributeValues: {
            ":tid":typeID
         }
      }

      this.dynamoClient.query(params, (err, data) => {
         if (err) {
            console.log(err);
         } else {
            console.log(data);
            if (data.Items.length > 0) {
               return data.Items[0].Name;
            }
         }
      })
      
      // step 3: pull from ESI
      let url: string = ESI_BASE_URL + "/v2/universe/types/"
      this.getTypeData(url, typeID).subscribe(
         res => {

         },
         error => { console.log(error); }
      )

      return "" + typeID;
   }

   getTypeData(url: string, typeID: number): Observable<any> {
      return this.http.get(url + typeID)
         .map(this.extractData);
   } 

   extractData(res: Response) {
      let body = res.json();
      return body || { };
   }


}