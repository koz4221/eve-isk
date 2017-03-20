import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { P0TableComponent } from './p0-table.component';

import { AppRoutingModule } from './app-routing.module';
import { AlertModule } from 'ng2-bootstrap';

import { PIDataService } from './pi-data.service';
import { PICalcService } from './pi-calc.service';
import { TypeIdResolver } from './services/type-id-resolver.service'

@NgModule({
  declarations: [
    AppComponent,
    P0TableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule,
    AlertModule.forRoot()
  ],
  providers: [
    PIDataService,
    PICalcService,
    TypeIdResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
