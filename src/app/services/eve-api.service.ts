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

      this.dynamoClient = new AWS.DynamoDB.DocumentClient();
   }

   public getTypeName(typeID: number, callback: (name: string) => void): void {
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
               callback(data.Items[0].Name);
            }
            else {
               // step 3: pull from ESI
               let url: string = ESI_BASE_URL + "/universe/types/" + typeID + "/?datasource=tranquility&language=en-us"
               this.getTypeData(url).subscribe(
                  res => {
                     callback(res.name);
                     // add to dynamoDB
                     this.saveNewDynamoItem(typeID, res.name);
                  },
                  error => { 
                     console.log(error);
                     callback("!ERROR");
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

   private saveNewDynamoItem(typeID: number, typeName: string): void {
      let params = {
         TableName: "EveTypeIDs",
         Item: {
            "TypeID": +typeID,
            "Name": typeName
         }
      };

      this.dynamoClient.put(params, (err, data) => {
         if (err) { console.log(err); }
      })
   }


}