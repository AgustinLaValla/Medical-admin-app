import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TurnosService } from 'src/app/services/turnos.service';
import {  loadGetSingleTurno, loadGetSingleTurnoSuccess, loadGetSingleTurnoFailed } from '../actions';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { Turno } from 'src/app/interfaces/turno.interface';
import { of } from 'rxjs';

@Injectable()
export class TurnoEffects {
    constructor(private action$: Actions, private turnosService: TurnosService) { }

    loadGetSingleTurno$ = createEffect(() => this.action$.pipe(
        ofType(loadGetSingleTurno),
        switchMap(({especialistaId, turnoId}) => this.turnosService.getSingleTurno(especialistaId, turnoId).pipe(
            map((turno: Turno) => loadGetSingleTurnoSuccess({turno: turno})),
            catchError((error: any) => of(loadGetSingleTurnoFailed({error})))
        ))
    ))

}