import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { PICalcService } from './pi-calc.service';
import { PIDataService } from './pi-data.service';

import { P0TableComponent } from './p0-table.component';
import { P1TableComponent } from './p1-table.component';
import { P21PTableComponent } from './p2-1p-table.component';
import { P22PTableComponent } from './p2-2p-table.component';
import { P1toP2TableComponent } from './p1-p2-table.component';
import { P2toP3TableComponent } from './p2-p3-table.component';
import { P1toP3TableComponent } from './p1-p3-table.component';

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

   @ViewChild(P0TableComponent)
   private p0Comp: P0TableComponent
   @ViewChild(P1TableComponent)
   private p1Comp: P1TableComponent
   @ViewChild(P21PTableComponent)
   private p21pComp: P21PTableComponent
   @ViewChild(P22PTableComponent)
   private p22pComp: P22PTableComponent
   @ViewChild(P1toP2TableComponent)
   private p1p2Comp: P1toP2TableComponent
   @ViewChild(P2toP3TableComponent)
   private p2p3Comp: P2toP3TableComponent
   @ViewChild(P1toP3TableComponent)
   private p1p3Comp: P1toP3TableComponent

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

   onPricesChange(value: string): void {
      this.piDataService.prices = value;
      this.reloadPrices();
   }

   reloadPrices(): void {
      this.piDataService.loadPIData(this.route.snapshot.data['typeIDs'].json());
      this.p0Comp.loadData();
      this.p1Comp.loadData();
      this.p21pComp.loadData();
      this.p22pComp.loadData();
      this.p1p2Comp.loadData();
      this.p2p3Comp.loadData();
      this.p1p3Comp.loadData();
   }
}