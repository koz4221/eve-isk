import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Http } from '@angular/http';

@Injectable()
export class TypeIdResolver implements Resolve<any> {
   constructor(private router: Router, private http: Http) {}

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.http.get('./static-data/pi-typeids.json');
   }
}