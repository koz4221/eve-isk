import { Injectable } from '@angular/core';

import { PIData } from './pi-data';

@Injectable()
export class PIDataService {

    private data: PIData[] = [
        {typeId: 2393, name: "Bacteria", pClass: 0, jitaBuy: 373.23, jitaSell: 380.99},
        {typeId: 2396, name: "Biofuels", pClass: 0, jitaBuy: 340.39, jitaSell: 387.88}
    ]

    getPIData() { return this.data; }
}