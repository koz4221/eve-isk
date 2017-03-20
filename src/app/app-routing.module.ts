import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TypeIdResolver } from './services/type-id-resolver.service'

import { P0TableComponent } from './p0-table.component';

const appRoutes: Routes = [
   {
      path: 'p0-table',
      component: P0TableComponent,
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