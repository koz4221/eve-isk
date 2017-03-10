import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { P0TableComponent } from './p0-table.component';

import { PIDataService } from './pi-data.service';
import { PICalcService } from './pi-calc.service';

@NgModule({
  declarations: [
    AppComponent,
    P0TableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    PIDataService,
    PICalcService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
