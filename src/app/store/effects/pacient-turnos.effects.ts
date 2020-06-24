import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PacientsService } from 'src/app/services/pacients.service';
import { loadGetPacientTurnos, loadGetPacientTurnosSuccess, loadGetPacientTurnosFailed, loadDeleteTurnoFromPacientSection, loadDeleteTurnoFromPacientSectionSuccess, loadDeleteTurnoFromPacientSectionFailed } from '../actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Turno } from 'src/app/interfaces/turno.interface';
import { of } from 'rxjs';
import { TurnosService } from 'src/app/services/turnos.service';

@Injectable()
export class PacientTurnosEffect { 
    constructor(private action$: Actions, 
                private pacientsService:PacientsService,
                private turnosService:TurnosService) { }

    //get Pacient Turnos Effect
    getPacientTurnos$ = createEffect(() => this.action$.pipe(
        ofType(loadGetPacientTurnos),
        switchMap(({pacientId}) => this.pacientsService.getPacienteTurnos(pacientId).pipe(
            map((pacientTurnos:Turno[]) => loadGetPacientTurnosSuccess({pacient_turnos:pacientTurnos})),
            catchError((error:any) => of( loadGetPacientTurnosFailed({error}) ))
        ))
    ));

    loadDeleteTurnoFromPacientSection$ = createEffect(() => this.action$.pipe(
        ofType(loadDeleteTurnoFromPacientSection),
        switchMap(({especialistaId, turno}) => this.turnosService.deleteSingleTurno(especialistaId, turno))
    ), {dispatch:false})

}