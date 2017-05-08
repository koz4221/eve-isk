import { Component } from '@angular/core';
import { DataTableModule } from "angular2-datatable";

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

   thisIsTopOrder(order: MarketOrder): boolean {
      return (order.orderID == order.topOrderID)
   }
}