import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { PICalcService } from './pi-calc.service';
import { PIDataService } from './pi-data.service';

import { P1toP3Component } from './p1-p3.component';
import { P2toP3Component } from './p2-p3.component';
import { P2toP4Component } from './p2-p4.component';
import { P3toP4Component } from './p3-p4.component';

import { PI_TYPE_IDS } from '../../static-data/pi-typeids';

@Component({
   selector: 'pi-tables',
   templateUrl: './pi-tables.component.html',
   styleUrls: ['../css/pi-data.css']
})

export class PITablesComponent {
   public loaded: boolean = false;

   @ViewChild(P1toP3Component)
   private p1p3Comp: P1toP3Component
   @ViewChild(P2toP3Component)
   private p2p3Comp: P2toP3Component
   @ViewChild(P3toP4Component)
   private p2p4Comp: P2toP4Component
   @ViewChild(P2toP4Component)
   private p3p4Comp: P3toP4Component

   constructor(protected piCalcService: PICalcService, private piDataService: PIDataService) {
      piCalcService.numSalBroTax = 4.4;
      piCalcService.numPOCOTax = 7;

      piDataService.prices = "jita";

      this.loadData();
   }

   updateSalBroTax(value: string): void {
      this.piCalcService.numSalBroTax = +value;
      this.recalculateValues();
   }

   updatePOCOTax(value: string): void {
      this.piCalcService.numPOCOTax = +value;
      this.recalculateValues();
   }

   onBuyFromChange(value: string): void {
      this.piCalcService.buyFromType = +value;
      this.recalculateValues();
   }

   onSellToChange(value: string): void {
      this.piCalcService.sellToType = +value;
      this.recalculateValues();
   }

   onPricesChange(value: string): void {
      this.piDataService.prices = value;
      this.loadData();
   }

   loadData(): void {
      this.loaded = false;
      this.piDataService.loadPIDataByCallback((data) => {
         this.loaded = true;
         if (this.p1p3Comp) this.p1p3Comp.loadData(data);
         if (this.p2p3Comp) this.p2p3Comp.loadData(data);
         if (this.p2p4Comp) this.p2p4Comp.loadData(data);
         if (this.p3p4Comp) this.p3p4Comp.loadData(data);
      });
   }

   recalculateValues(): void {
      if (this.p2p4Comp) this.p2p4Comp.loadData();
      if (this.p2p3Comp) this.p2p3Comp.loadData();
      if (this.p3p4Comp) this.p3p4Comp.loadData();
      if (this.p1p3Comp) this.p1p3Comp.loadData();
   }
}