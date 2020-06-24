import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StuffRoutingModule } from './stuff-routing.module';
import { StuffComponent } from './stuff.component';
import { MaterialModule } from 'src/app/material/material.module';
import { DialogMemberComponent } from './dialog-member/dialog-member.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [StuffComponent, DialogMemberComponent],
  imports: [
    CommonModule,
    StuffRoutingModule,
    MaterialModule,
    FormsModule
  ],
  exports:[MaterialModule, FormsModule],
  entryComponents:[DialogMemberComponent]
})
export class StuffModule { }
