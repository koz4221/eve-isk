import { Injectable } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';

import { PIData } from './pi-data';

const PI_P0_TYPEIDS: number[] = [
    2073, 2287
]

@Injectable()
export class PIDataService {

    private data: PIData[] = [
        {typeId: 2073, name: "Microorganisms", pClass: 0, jitaBuy: 1.63, jitaSell: 2.00},
        {typeId: 2287, name: "Complex Organisms", pClass: 0, jitaBuy: 7.25, jitaSell: 7.41}
    ]

    getPIData(): PIData[] { return this.data; }

    getP0PriceData() {}
}