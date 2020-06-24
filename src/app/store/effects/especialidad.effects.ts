import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import {  loadGetEspecialidad, loadGetEspecialidadSuccess, loadGetEspecialidadFailed, loadAddServicio, loadAddServicioSuccess, loadAddServicioFailed, loadDeleteServicio, loadDeleteServicioFailed, loadUpdateServicio, loadUpdateServicioSuccess, loadUpdateServicioFailed, loadGetEspecialidadByItsName, loadGetEspecialidadByItsNameSuccess, loadGetEspecialidadByItsNameFailed, loadDeleteServicioSuccess } from '../actions/especialidad.action';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Especialidad } from 'src/app/interfaces/especialidad.interface';
import { of } from 'rxjs';

@Injectable()
export class EspecialidadEffects {
    constructor(private action$: Actions, private especialidadesService: EspecialidadesService) { }

    //GetEspecialidad Effect
    loadGetEspecialidad$ = createEffect(() => this.action$.pipe(
        ofType(loadGetEspecialidad),
        switchMap((action) => this.especialidadesService.getEspecialidad(action.id).pipe(
            map((especialidad: Especialidad) => loadGetEspecialidadSuccess({especialidad: especialidad})),
            catchError((error: any) => of( loadGetEspecialidadFailed({error})))
        ))
    )
    )
    //Add Servicio Effect
    loadAddServicio$ = createEffect(() => this.action$.pipe(
        ofType(loadAddServicio),
        switchMap((data) => of(this.especialidadesService.addNewServicio(data.id, data.value)).pipe(
            map(() =>  loadAddServicioSuccess( {id:data.id, value: data.value})),
            catchError((error: any) => of( loadAddServicioFailed({error})))
        ))
    ))

    //Delete Servicio Effect
    loadDeleteServicio$ = createEffect(() => this.action$.pipe(
        ofType(loadDeleteServicio),
        switchMap(({id, value}) => of(this.especialidadesService.deleteServicio(id, value)).pipe(
            map(() => loadDeleteServicioSuccess({value: value}) ),
            switchMap((error: any) => of(loadDeleteServicioFailed({error})))
        ))
    ))

    //Update Servicio Effect
    loadUpdateServicio$ = createEffect(() => this.action$.pipe(
        ofType(loadUpdateServicio),
        switchMap((data) => of(this.especialidadesService.updateSerivico(data.id, data.newValue, data.oldValue)).pipe(
            map((newArray: string[]) =>  loadUpdateServicioSuccess({newValue:newArray})),
            switchMap((error: any) => of(loadUpdateServicioFailed({error})))
        ))
    ))

    //Get Especialidad By Its Name
    loadGetEspecilidadByItsName$ = createEffect(() => this.action$.pipe(
        ofType(loadGetEspecialidadByItsName),
        switchMap(({nombreEspeciliadad}) => this.especialidadesService.getEspecialidadByItsName(nombreEspeciliadad).pipe(
            map((especialidad: Especialidad[]) => loadGetEspecialidadByItsNameSuccess({especialidad: especialidad[0]})),
            catchError((error: any) => of(loadGetEspecialidadByItsNameFailed({error})))
        ))
    ))
}