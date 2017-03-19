import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { P0TableComponent } from './p0-table.component';

import { PIDataService } from './pi-data.service';
import { PICalcService } from './pi-calc.service';
import { SampleService } from './sample.service';

@NgModule({
  declarations: [
    AppComponent,
    P0TableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [
    PIDataService,
    PICalcService,
    SampleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
