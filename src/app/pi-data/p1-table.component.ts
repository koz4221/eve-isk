import { Component, OnInit } from '@angular/core';

import { PIData } from './pi-data';

import { PIDataService } from './pi-data.service';
import { PICalcService } from './pi-calc.service';

@Component({
   moduleId: module.id,
   selector: 'p1-table',
   templateUrl: './p1-table.component.html',
   styleUrls: ['../css/pi-data.css']
})

export class P1TableComponent implements OnInit {
   data: PIData[] = [];

   constructor(
      public piDataService: PIDataService, 
      public piCalcService: PICalcService
   ) {}

   ngOnInit(): void {
      this.loadData();
   }

   public loadData(): void {
      this.data = this.piDataService.data.filter(tid => tid.pClass === 1);
   }
}