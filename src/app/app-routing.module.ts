import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TypeIdResolver } from './services/type-id-resolver.service'

import { PITablesComponent } from './pi-data/pi-tables.component';

const appRoutes: Routes = [
   {
      path: 'pi-tables',
      component: PITablesComponent,
      resolve: {
         typeIDs: TypeIdResolver
      }
   }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}