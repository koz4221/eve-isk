import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { P0TableComponent } from './p0-table.component';

const appRoutes: Routes = [
   {
      path: 'p0-table',
      component: P0TableComponent
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