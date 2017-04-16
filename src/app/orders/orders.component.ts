import { Component } from '@angular/core';

import { MarketOrder } from './orders';

import { OrdersService } from './orders.service';
import { EveAPIService } from '../services/eve-api.service';

@Component({
   selector: 'orders',
   templateUrl: './orders.component.html'
})

export class OrdersComponent {
   constructor(public ordersService: OrdersService, protected eveAPIService: EveAPIService) {
      ordersService.loadOrders();
      //eveAPIService.getTypeName(2305);
   }
}