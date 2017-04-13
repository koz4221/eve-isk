import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { OrdersComponent } from './orders.component';

import { OrdersService } from './orders.service';

@NgModule({
  declarations: [
      OrdersComponent
  ],
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      JsonpModule
  ],
  providers: [
      OrdersService
  ],
})
export class OrdersModule { }
