import { Component } from '@angular/core';

import { MarketOrder } from './orders';

import { OrdersService } from './orders.service';

@Component({
   selector: 'orders',
   templateUrl: './orders.component.html'
})

export class OrdersComponent {
   public orders: MarketOrder[]

   constructor(public ordersService: OrdersService) {
      ordersService.loadOrders();
      this.orders = ordersService.orders;
   }
}