import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TypeIdResolver } from './services/type-id-resolver.service'

import { PITablesComponentOld } from './pi-data/pi-tables.component';
import { PITablesComponent } from './pi/pi-tables.component';
import { OrdersComponent } from './orders/orders.component';
import { MarketComponent } from './market/market.component';

const appRoutes: Routes = [
   {
      path: 'pi-tables-old',
      component: PITablesComponentOld,
      resolve: { 
         typeIDs: TypeIdResolver 
      }
   },
   {
      path: 'pi-tables',
      component: PITablesComponent,
      resolve: { 
         typeIDs: TypeIdResolver 
      }
   },
   {
      path: 'orders',
      component: OrdersComponent
   },
   {
      path: 'market',
      component: MarketComponent
   }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}