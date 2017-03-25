import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PICalcService } from './pi-calc.service';

@Component({
  selector: 'pi-tables',
  templateUrl: './pi-tables.component.html'
})

export class PITablesComponent {
   CCUpgradeSkill: number = 3;
   ddlCCUpgradeVals: number[] = [0, 1, 2, 3, 4, 5];

   constructor(piCalcService: PICalcService) {
      piCalcService.CCUpgradeSkill = 3;
      piCalcService.EHeadProdPerHour = 5600;
      console.log(piCalcService.getEtoP1FactoryProd());
   }
}