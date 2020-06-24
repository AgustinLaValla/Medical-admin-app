import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { TurnosService } from 'src/app/services/turnos.service';
import {  loadGetTurnosCounter, loadGetTurnosCounterSuccess, loadGetTurnosCounterFailed, loadGetTurnosConcretadosLength, loadGetTurnosConcretadosLengthSuccess, loadGetTurnosConcretadosLengthFailed } from '../actions';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Counter } from 'src/app/interfaces/counter.interface';
import { of } from 'rxjs';
import { Turno } from 'src/app/interfaces/turno.interface';

@Injectable()
export class TurnosCounterEffect {
    constructor(private action$: Actions, private turnosService: TurnosService) { }

    //Turnos Counter Effects
    getTurnosCounter$ = createEffect(() => this.action$.pipe(
        ofType(loadGetTurnosCounter),
        switchMap(({especialistaId}) => this.turnosService.getTurnosCounterValue(especialistaId).pipe(
            map((total_turnos: Counter) =>  loadGetTurnosCounterSuccess({totalTurnos:total_turnos.counter})),
            catchError((error: any) => of( loadGetTurnosCounterFailed({error})))
        ))
    ));

    //Turnos Concretados Length Effecrs
    getTurnosConcretadosLength$ = createEffect(() => this.action$.pipe(
        ofType(loadGetTurnosConcretadosLength),
        switchMap(({especialistaId}) => this.turnosService.getTurnosConcretadosLength(especialistaId).pipe(
            map((turnos:Turno[]) => loadGetTurnosConcretadosLengthSuccess({totalTurnos: turnos.length})),
            catchError((error:any) => of( loadGetTurnosConcretadosLengthFailed({error}) ))
        ))
    ));

}