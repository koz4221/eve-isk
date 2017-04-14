import { Component } from '@angular/core';

import { MarketOrder } from './orders';

import { OrdersService } from './orders.service';

@Component({
   selector: 'orders',
   templateUrl: './orders.component.html'
})

export class OrdersComponent {
   constructor(public ordersService: OrdersService) {
      ordersService.loadOrders();
   }
}