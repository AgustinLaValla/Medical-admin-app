import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [DashboardComponent, ToolbarComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    RouterModule
  ],
  exports: [MaterialModule, RouterModule]
})
export class DashboardModule { }
