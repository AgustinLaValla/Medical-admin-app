import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { TurnosRoutingModule } from './turnos-routing.module';
import { TurnosComponent } from './turnos.component';
import { MaterialModule } from 'src/app/material/material.module';
import { EspecialistasListComponent } from './acordion/especialistas-list/especialistas-list.component';
import { TurnosTableComponent } from './turnos-table/turnos-table.component';
import { DateAppoimentPipe } from 'src/app/pipes/date-appoiment.pipe';
import { TurnosDialogComponent } from './turnos-dialog/turnos-dialog.component';
import { FormsModule } from '@angular/forms';
import { LOCALE_ID } from '@angular/core';
import localeEsAr from '@angular/common/locales/es-AR';
import { MAT_DATE_LOCALE } from '@angular/material';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { ScrollableDirective } from '../../../directives/scrollable.directive';
import { AccordionComponent } from './acordion/accordion.component';
import { PacientListComponent } from './acordion/pacient-list/pacient-list.component';
import { PacientTableComponent } from './pacient-data/pacient-table/pacient-table.component';
import { PacientDataComponent } from './pacient-data/pacient-data.component';
import { PacientInfoComponent } from './pacient-data/pacient-info/pacient-info.component';
import { PacientdataDialogComponent } from './pacient-data/pacient-info/pacientdata-dialog/pacientdata-dialog.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TurnosTabsComponent } from './turnos-tabs/turnos-tabs.component';
import { FullCalendarModule } from '@fullcalendar/angular';

registerLocaleData(localeEsAr, 'es-Ar');


@NgModule({
  declarations: [
    TurnosComponent, 
    EspecialistasListComponent, 
    TurnosTableComponent, 
    DateAppoimentPipe, 
    TurnosDialogComponent,
    ScrollableDirective,
    AccordionComponent,
    PacientListComponent,
    PacientTableComponent,
    PacientDataComponent,
    PacientInfoComponent,
    PacientdataDialogComponent,
    CalendarComponent,
    TurnosTabsComponent,
  ],
  imports: [
    CommonModule,
    TurnosRoutingModule,
    MaterialModule,
    FormsModule,
    MatMomentDateModule,
    FullCalendarModule
  ],
  exports: [MaterialModule, FormsModule, MatMomentDateModule, ScrollableDirective, EspecialistasListComponent],
  entryComponents: [TurnosDialogComponent, PacientdataDialogComponent],
  providers: [ 
    { provide: LOCALE_ID, useValue: 'es-AR' } ,
    { provide: MAT_DATE_LOCALE, useValue: 'es-AR'  },
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
]
})
export class TurnosModule { }
