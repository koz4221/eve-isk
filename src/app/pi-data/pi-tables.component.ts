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
import { P2toP4TableComponent } from './p2-p4-table.component';
import { P3toP4TableComponent } from './p3-p4-table.component';

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
   @ViewChild(P2toP4TableComponent)
   private p2p4Comp: P2toP4TableComponent
   @ViewChild(P3toP4TableComponent)
   private p3p4Comp: P3toP4TableComponent

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
      if (this.p0Comp) this.p0Comp.loadData();
      if (this.p1Comp) this.p1Comp.loadData();
      if (this.p21pComp) this.p21pComp.loadData();
      if (this.p22pComp) this.p22pComp.loadData();
      if (this.p1p2Comp) this.p1p2Comp.loadData();
      if (this.p2p3Comp) this.p2p3Comp.loadData();
      if (this.p1p3Comp) this.p1p3Comp.loadData();
      if (this.p2p4Comp) this.p2p4Comp.fullLoadData();
      if (this.p3p4Comp) this.p3p4Comp.fullLoadData();
   }

   recalculateValues(): void {
      this.piCalcService.resetCalculatedValues();
      this.p2p4Comp.loadData();
      this.p3p4Comp.loadData();
   }
}