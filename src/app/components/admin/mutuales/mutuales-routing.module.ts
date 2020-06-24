import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MutualesComponent } from './mutuales.component';

const routes: Routes = [{ path: '', component: MutualesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MutualesRoutingModule { }
