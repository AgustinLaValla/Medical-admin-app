import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PacientCounter } from '../../interfaces/counter.interface';
import { Injectable } from '@angular/core';
import { PacientsService } from 'src/app/services/pacients.service';
import { loadGetPacients, loadGetPacientsSuccess, loadGetStuffFailed, loadGetPacientByLastname, loadGetPacientByLastnameSuccess, loadGetPacienteByLastnameFailed, loadDeletePacient, loadDeletePacientSuccess, loadDeletePacientFailed, loadGetPacientsCounter, loadGetPacientsCounterSuccess, loadGetPacientsCounterFailed } from '../actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Pacient } from 'src/app/interfaces/pacient.interface';
import { of } from 'rxjs';

@Injectable()
export class PacientesEffect {
    constructor(private action$: Actions,
        private pacientesService: PacientsService) { }

    //getPacient Effect
    loadGetPacientes$ = createEffect(() => this.action$.pipe(
        ofType(loadGetPacients),
        switchMap(({count}) => this.pacientesService.getPacientsColl(count).pipe(
            map((pacientes:Pacient[]) => loadGetPacientsSuccess({pacientes:pacientes})),
            catchError((error: any) => of(loadGetStuffFailed({error})))
        ))
    )
    );

    //loadGetPacienteByLastname
    loadGetPacienteByLastname$ = createEffect(() => this.action$.pipe(
        ofType(loadGetPacientByLastname),
        switchMap(({startValue,endValue}) => this.pacientesService.getPacientByLastname(startValue, endValue).pipe(
            map((pacients:Pacient[]) => loadGetPacientByLastnameSuccess({pacients:pacients})),
            catchError((error:any) => of( loadGetPacienteByLastnameFailed({error}) ))
        ))
    ));

    //loadDeletePacient
    loadDeletePacient$ = createEffect(() => this.action$.pipe(
        ofType(loadDeletePacient),
        switchMap(({paciente}) => of( this.pacientesService.deletePacient(paciente)).pipe(
            map(() => loadDeletePacientSuccess({pacienteId: paciente['id']})),
            catchError((error:any) => of(loadDeletePacientFailed({error})))
        ))
    ));

    //loadGetPacientesCounter effect
    loadGetPacientesCounter$ = createEffect(() => this.action$.pipe(
        ofType(loadGetPacientsCounter),
        switchMap(() => this.pacientesService.getPacientsCounter().pipe(
            map((pacientsCounter:PacientCounter) => loadGetPacientsCounterSuccess({
                pacientsCounter: pacientsCounter.pacient_counter
            })),
            catchError((error:any) => of(loadGetPacientsCounterFailed({error})))
        ))
    ))

}
