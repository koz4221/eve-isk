import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PITablesComponent } from './pi-data/pi-tables.component';

import { AppRoutingModule } from './app-routing.module';
import { PITablesModule } from './pi-data/pi-tables.module';

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
    AppRoutingModule,
    PITablesModule
  ],
  providers: [
    TypeIdResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
