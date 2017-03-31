import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { PICalcService } from './pi-calc.service';
import { PIDataService } from './pi-data.service';

@Component({
  selector: 'pi-tables',
  templateUrl: './pi-tables.component.html'
})

export class PITablesComponent {
   CCUpgradeSkill: number = 3;
   EHeadProdPerHour: number = 5600;
   ddlCCUpgradeVals: number[] = [0, 1, 2, 3, 4, 5];

   constructor(protected piCalcService: PICalcService, piDataService: PIDataService, private route: ActivatedRoute) {
      piCalcService.CCUpgradeSkill = 3;
      piCalcService.EHeadProdPerHour = 5600;
      piDataService.loadPIData(this.route.snapshot.data['typeIDs'].json());
   }

   onCCUChange(value: string) {
      this.piCalcService.CCUpgradeSkill = +value;
      this.piCalcService.resetCalculatedValues();
   }

   update(value: string): void {
      this.piCalcService.EHeadProdPerHour = +value;
   }
}