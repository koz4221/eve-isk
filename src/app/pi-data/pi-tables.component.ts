import { Component } from '@angular/core';

import { PICalcService } from './pi-calc.service';

@Component({
  selector: 'pi-tables',
  templateUrl: './pi-tables.component.html'
})

export class PITablesComponent {
   constructor(piCalcService: PICalcService) {
      piCalcService.CCUpgradeSkill = 3;
      piCalcService.EHeadProdPerHour = 5600;
      console.log(piCalcService.getEtoP1FactoryProd());
   }
}