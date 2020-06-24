import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstadisticasYFacturacionComponent } from './estadisticas-y-facturacion.component';

const routes: Routes = [{ path: '', component: EstadisticasYFacturacionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstadisticasYFacturacionRoutingModule { }
