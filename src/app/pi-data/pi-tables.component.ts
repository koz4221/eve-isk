import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { PICalcService } from './pi-calc.service';
import { PIDataService } from './pi-data.service';

@Component({
   selector: 'pi-tables',
   templateUrl: './pi-tables.component.html',
   styleUrls: ['../css/pi-data.css']
})

export class PITablesComponent {
   CCUpgradeSkill: number;
   EHeadProdPerHour: number;
   numLaunchpads: number;
   numStorage: number;
   ddlCCUpgradeVals: number[] = [0, 1, 2, 3, 4, 5];
   ddlLPVals: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
   ddlSFVals: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

   constructor(protected piCalcService: PICalcService, private piDataService: PIDataService, private route: ActivatedRoute) {
      piCalcService.CCUpgradeSkill = 3;
      piCalcService.EHeadProdPerHour = 6000;
      piCalcService.numLaunchpads = 1;
      piCalcService.numStorage = 0;
      piCalcService.numSalBroTax = 5;
      piCalcService.numPOCOTax = 10;
      piCalcService.numLinks = 0;
      piCalcService.numAvgLinkLength = 0;
      piDataService.loadPIData(this.route.snapshot.data['typeIDs'].json());
   }

   onCCUChange(value: string) {
      this.piCalcService.CCUpgradeSkill = +value;
      this.piCalcService.resetCalculatedValues();
   }

   onLPChange(value: string) {
      this.piCalcService.numLaunchpads = +value;
      this.piCalcService.resetCalculatedValues();
   }

   onSFChange(value: string) {
      this.piCalcService.numStorage = +value;
      this.piCalcService.resetCalculatedValues();
   }

   updateEHeadProdPerHour(value: string): void {
      this.piCalcService.EHeadProdPerHour = +value;
      this.piCalcService.resetCalculatedValues();
   }

   updateNumLinks(value: string): void {
      this.piCalcService.numLinks = +value;
      this.piCalcService.resetCalculatedValues();
   }

   updateAvgLinkLength(value: string): void {
      this.piCalcService.numAvgLinkLength = +value;
      this.piCalcService.resetCalculatedValues();
   }

   updateSalBroTax(value: string): void {
      this.piCalcService.numSalBroTax = +value;
      this.piCalcService.resetCalculatedValues();
   }

   updatePOCOTax(value: string): void {
      this.piCalcService.numPOCOTax = +value;
      this.piCalcService.resetCalculatedValues();
   }

   reloadPrices(): void {
      this.piDataService.loadPIData(this.route.snapshot.data['typeIDs'].json());
   }
}