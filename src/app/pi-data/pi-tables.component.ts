import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PICalcService } from './pi-calc.service';

@Component({
  selector: 'pi-tables',
  templateUrl: './pi-tables.component.html'
})

export class PITablesComponent {
   CCUpgradeSkill: number = 3;
   EHeadProdPerHour: number = 5600;
   ddlCCUpgradeVals: number[] = [0, 1, 2, 3, 4, 5];

   constructor(protected piCalcService: PICalcService) {
      piCalcService.CCUpgradeSkill = 3;
      piCalcService.EHeadProdPerHour = 5600;
      //piCalcService.getEtoP2FactoryProd_1P();
   }

   onCCUChange(value: string) {
      this.piCalcService.CCUpgradeSkill = +value;
      this.piCalcService.resetCalculatedValues();
   }

   update(value: string): void {
      this.piCalcService.EHeadProdPerHour = +value;
   }
}