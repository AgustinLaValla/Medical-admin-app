import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MutualesRoutingModule } from './mutuales-routing.module';
import { MutualesComponent } from './mutuales.component';
import { MaterialModule } from 'src/app/material/material.module';
import { MutualesDialogComponent } from './mutuales-dialog/mutuales-dialog.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [MutualesComponent, MutualesDialogComponent],
  imports: [
    CommonModule,
    MutualesRoutingModule,
    MaterialModule,
    FormsModule
  ],
  exports:[MaterialModule],
  entryComponents:[MutualesDialogComponent]
})
export class MutualesModule { }
