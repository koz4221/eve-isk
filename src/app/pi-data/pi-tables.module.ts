import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { PITablesComponent } from './pi-tables.component';
import { P0TableComponent } from './p0-table.component';
import { P1TableComponent } from './p1-table.component';
import { P21PTableComponent } from './p2-1p-table.component';

import { PIDataService } from './pi-data.service';
import { PICalcService } from './pi-calc.service';

@NgModule({
  declarations: [
      PITablesComponent,
      P0TableComponent,
      P1TableComponent,
      P21PTableComponent
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
export class PITablesModule { }
