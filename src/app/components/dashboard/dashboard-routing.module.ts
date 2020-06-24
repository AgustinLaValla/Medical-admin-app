import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { StuffModule } from '../admin/stuff/stuff.module';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', loadChildren: () => import('../admin/turnos/turnos.module').then(m => m.TurnosModule) },
      { path: 'stuff', loadChildren: () => import('../admin/stuff/stuff.module').then(m => m.StuffModule) },
      { path: 'especialidades', loadChildren: () => import('../admin/especialidades/especialidades.module').then(m => m.EspecialidadesModule) },
      { path: 'estadisticas', loadChildren: () => import('../admin/estadisticas-y-facturacion/estadisticas-y-facturacion.module').then(m => m.EstadisticasYFacturacionModule) },
      { path: 'mutuales', loadChildren: () => import('../admin/mutuales/mutuales.module').then(m => m.MutualesModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
