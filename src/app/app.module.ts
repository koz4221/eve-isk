import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { PITablesModule } from './pi/pi-tables.module'
import { OrdersModule } from './orders/orders.module';
import { MarketModule } from './market/market.module';

import { TypeIdResolver } from './services/type-id-resolver.service'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    PITablesModule,
    OrdersModule,
    MarketModule
  ],
  providers: [
    TypeIdResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
