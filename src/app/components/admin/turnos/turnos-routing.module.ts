import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TurnosComponent } from './turnos.component';

const routes: Routes = [{ path: '', component: TurnosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnosRoutingModule { }
