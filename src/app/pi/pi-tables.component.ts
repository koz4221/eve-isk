import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { PICalcService } from './pi-calc.service';
import { PIDataService } from './pi-data.service';

import { P1toP3Component } from'./p1-p3.component';
import { P2toP4Component } from './p2-p4.component';
import { P3toP4Component } from './p3-p4.component';

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

   @ViewChild(P1toP3Component)
   private p1p3Comp: P1toP3Component
   @ViewChild(P3toP4Component)
   private p2p4Comp: P2toP4Component
   @ViewChild(P2toP4Component)
   private p3p4Comp: P3toP4Component

   constructor(protected piCalcService: PICalcService, private piDataService: PIDataService, private route: ActivatedRoute) {
      piCalcService.CCUpgradeSkill = 3;
      piCalcService.EHeadProdPerHour = 6000;
      piCalcService.numLaunchpads = 1;
      piCalcService.numStorage = 0;
      piCalcService.numSalBroTax = 5;
      piCalcService.numPOCOTax = 10;
      piCalcService.numLinks = 0;
      piCalcService.numAvgLinkLength = 0;

      piDataService.prices = "jita";
      piDataService.loadPIData(this.route.snapshot.data['typeIDs'].json());
   }

   onCCUChange(value: string) {
      this.piCalcService.CCUpgradeSkill = +value;
      this.recalculateValues()
   }

   onLPChange(value: string) {
      this.piCalcService.numLaunchpads = +value;
      this.recalculateValues()
   }

   onSFChange(value: string) {
      this.piCalcService.numStorage = +value;
      this.recalculateValues()
   }

   updateEHeadProdPerHour(value: string): void {
      this.piCalcService.EHeadProdPerHour = +value;
      this.recalculateValues()
   }

   updateNumLinks(value: string): void {
      this.piCalcService.numLinks = +value;
      this.recalculateValues()
   }

   updateAvgLinkLength(value: string): void {
      this.piCalcService.numAvgLinkLength = +value;
      this.recalculateValues()
   }

   updateSalBroTax(value: string): void {
      this.piCalcService.numSalBroTax = +value;
      this.recalculateValues()
   }

   updatePOCOTax(value: string): void {
      this.piCalcService.numPOCOTax = +value;
      this.recalculateValues()
   }

   onPricesChange(value: string): void {
      this.piDataService.prices = value;
      this.reloadPrices();
   }

   reloadPrices(): void {
      this.piDataService.loadPIData(this.route.snapshot.data['typeIDs'].json());
      if (this.p2p4Comp) this.p2p4Comp.fullLoadData();
      if (this.p3p4Comp) this.p3p4Comp.fullLoadData();
      if (this.p1p3Comp) this.p1p3Comp.fullLoadData();
   }

   recalculateValues(): void {
      this.piCalcService.resetCalculatedValues();
      this.p2p4Comp.loadData();
      this.p3p4Comp.loadData();
      this.p1p3Comp.loadData();
   }
}