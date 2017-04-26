import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PITablesComponent } from './pi/pi-tables.component';
import { OrdersComponent } from './orders/orders.component';
import { MarketComponent } from './market/market.component';

const appRoutes: Routes = [
   {
      path: 'pi-tables',
      component: PITablesComponent,
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