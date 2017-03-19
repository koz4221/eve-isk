import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { P0TableComponent } from './p0-table.component';

import { AppRoutingModule } from './app-routing.module';

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
    JsonpModule,
    AppRoutingModule
  ],
  providers: [
    PIDataService,
    PICalcService,
    SampleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
