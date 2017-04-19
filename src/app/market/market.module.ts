import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { MarketComponent } from './market.component';

import { EveAPIService } from '../services/eve-api.service';

@NgModule({
  declarations: [
      MarketComponent
  ],
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      JsonpModule
  ],
  providers: [
      EveAPIService
  ],
})
export class MarketModule { }
