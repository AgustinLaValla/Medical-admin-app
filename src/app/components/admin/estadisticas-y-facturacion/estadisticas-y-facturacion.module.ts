import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstadisticasYFacturacionRoutingModule } from './estadisticas-y-facturacion-routing.module';
import { EstadisticasYFacturacionComponent } from './estadisticas-y-facturacion.component';
import { AccordionComponent } from './accordion/accordion.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { MaterialModule } from 'src/app/material/material.module';
import { TurnosModule } from '../turnos/turnos.module';
import { ChartsModule } from 'ng2-charts';
import { DoughnutChartComponent } from './statistics/doughnut-chart/doughnut-chart.component';
import { FormsModule } from '@angular/forms';
import { BarChartComponent } from './statistics/bar-chart/bar-chart.component';
import { BaseChartComponent } from './statistics/base-chart/base-chart.component';


@NgModule({
  declarations: [
    EstadisticasYFacturacionComponent,
    AccordionComponent,
    StatisticsComponent,
    DoughnutChartComponent,
    BarChartComponent,
    BaseChartComponent,
  ],
  imports: [
    CommonModule,
    EstadisticasYFacturacionRoutingModule,
    MaterialModule,
    TurnosModule,
    ChartsModule,
    FormsModule
  ]
})
export class EstadisticasYFacturacionModule { }
