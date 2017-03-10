import { Component, OnInit } from '@angular/core';

import { PIData } from './pi-data';

import { PIDataService } from './pi-data.service';
import { PICalcService } from './pi-calc.service';

@Component({
   moduleId: module.id,
   selector: 'p0-table',
   templateUrl: './p0-table.component.html'
})

export class P0TableComponent implements OnInit {
   data: PIData[];

   constructor(
      private piDataService: PIDataService, 
      private piCalcService: PICalcService
   ) {}

   ngOnInit(): void {
      this.data = this.piDataService.getPIData();
   }
}
