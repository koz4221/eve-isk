import { Component, OnInit } from '@angular/core';

import { PIData } from './pi-data';

import { PIDataService } from './pi-data.service';
import { PICalcService } from './pi-calc.service';

@Component({
   moduleId: module.id,
   selector: 'p2-1p-table',
   templateUrl: './p2-1p-table.component.html',
   styleUrls: ['../css/pi-data.css']
})

export class P21PTableComponent implements OnInit {
   data: PIData[] = [];
   singlePlanet: number[] = [2327,2321,3697]

   constructor(
      public piDataService: PIDataService, 
      public piCalcService: PICalcService
   ) {}

   ngOnInit(): void {
      this.data = this.piDataService.data.filter(tid => tid.pClass === 2 && !this.singlePlanet.includes(tid.typeId));
   }
}