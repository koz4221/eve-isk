import { Injectable } from '@angular/core';

import { PIData } from './pi-data';

@Injectable()
export class PIDataService {

    private data: PIData[] = [
        {typeId: 2073, name: "Microorganisms", pClass: 0, jitaBuy: 1.63, jitaSell: 2.00},
        {typeId: 2287, name: "Complex Organisms", pClass: 0, jitaBuy: 7.25, jitaSell: 7.41}
    ]

    getPIData() { return this.data; }
}