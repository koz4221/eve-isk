import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { PITablesComponent } from './pi-tables.component';
import { P1toP3Component } from'./p1-p3.component';
import { P2toP4Component } from './p2-p4.component';
import { P3toP4Component } from './p3-p4.component';

import { PIDataService } from './pi-data.service';
import { PICalcService } from './pi-calc.service';

@NgModule({
  declarations: [
      PITablesComponent,
      P1toP3Component,
      P2toP4Component,
      P3toP4Component
  ],
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      JsonpModule
  ],
  providers: [
      PIDataService,
      PICalcService
  ],
})
export class PIModule { }
