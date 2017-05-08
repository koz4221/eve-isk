import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { DataTableModule } from "angular2-datatable";

import { OrdersComponent } from './orders.component';

import { OrdersService } from './orders.service';
import { EveAPIService } from '../services/eve-api.service';

@NgModule({
  declarations: [
      OrdersComponent
  ],
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      JsonpModule,
      DataTableModule
  ],
  providers: [
      OrdersService,
      EveAPIService
  ],
})
export class OrdersModule { }
