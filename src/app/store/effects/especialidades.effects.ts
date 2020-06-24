import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { of } from 'rxjs';
import {
loadGetEspecialidades, loadGetEspecialidadesSuccess, loadGetEspecialidadesFailed,loadAddEspecialidad, loadAddEspecialidadSuccess, 
loadAddEspecialidadFailed, loadDeleteEspecialidad, loadDeleteEspecialidadSuccess, loadDeleteEspecialidadFailed } from '../actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Especialidad } from 'src/app/interfaces/especialidad.interface';

@Injectable()
export class EspecialidadesEffects {
    constructor(private action$: Actions, private especialidadesService: EspecialidadesService) { }

    //getEspecialidades effect
    loadGetEspecialidades$ = createEffect(() => this.action$.pipe(
        ofType(loadGetEspecialidades),
        switchMap((action) => this.especialidadesService.getEspecialidades().pipe(
            map((esp: Especialidad[]) => loadGetEspecialidadesSuccess({especialidades: esp})),
            catchError((error: any) => of( loadGetEspecialidadesFailed({error})))
        ))
    ))

    //addEspecialidad effect
    loadAddEspecialidad$ = createEffect(() => this.action$.pipe(
        ofType(loadAddEspecialidad),
        map((action) => action.newEspecialidad),
        switchMap((data: Especialidad) => of(this.especialidadesService.addEspecialidad(data)).pipe(
            map((id: string) => loadAddEspecialidadSuccess({newEspecialidad:data, id:id})),
            catchError((error: any) => of(loadAddEspecialidadFailed({error})))
        ))
    ))

    //deleteEspecialidad effect
    loadDeleteEspecialidad = createEffect(() => this.action$.pipe(
        ofType(loadDeleteEspecialidad),
        map((action) => action.id),
        switchMap((id: string) => of(this.especialidadesService.deleteEspecialidad(id)).pipe(
            map(() => loadDeleteEspecialidadSuccess({id:id})),
            catchError((error: any) => of(loadDeleteEspecialidadFailed({error})))
        ))
    ))
}