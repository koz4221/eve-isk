import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { DataTableModule } from "angular2-datatable";

import { MarketComponent } from './market.component';

import { MarketService } from './market.service';
import { EveAPIService } from '../services/eve-api.service';

@NgModule({
  declarations: [
      MarketComponent
  ],
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      JsonpModule,
      DataTableModule
  ],
  providers: [
      EveAPIService,
      MarketService
  ],
})
export class MarketModule { }
