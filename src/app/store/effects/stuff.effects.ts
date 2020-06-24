import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StuffService } from 'src/app/services/stuff.service';
import {loadGetStuffSuccess, loadGetStuffFailed, loadDeleteMiembro, loadDeleteMiembroSuccess, loadDeleteMiembroFailed, loadGetStuff, 
    loadAddMiembro, loadAddMiembroSuccess, loadAddMiembroFailed } from '../actions/stuff.actions';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { Miembro } from 'src/app/interfaces/miembro.interface';
import { of } from 'rxjs';

@Injectable()
export class StuffEffect {
    constructor(private action$: Actions,
        private stuffService: StuffService) { }

    //Get Stuff Effect
    loadGetStuff$ = createEffect(() => this.action$.pipe(
            ofType(loadGetStuff),
            switchMap((action) => this.stuffService.getStuff().pipe(
                map((stuff: Miembro[]) => loadGetStuffSuccess({stuff: stuff})),
                catchError((error: any) => of( loadGetStuffFailed({error})))
            ))
        )
    )

    //Add Miembro Effect
    loadAddMiembro$ = createEffect(() => this.action$.pipe(
        ofType(loadAddMiembro),
        switchMap((data) => of(this.stuffService.addMiembro(data.miembro, data.image)).pipe(
            map((photoURL: string) =>  loadAddMiembroSuccess({miembro:data.miembro,image: photoURL})),
            catchError((error: any) => of(loadAddMiembroFailed({error})))
        ))
    ))

    //Delete Miembro Effect
    loadDeleteMiebro$ = createEffect(() => this.action$.pipe(
        ofType(loadDeleteMiembro),
        map((action) => action.id),
        switchMap((data: string) => of(this.stuffService.deleteMiembro(data)).pipe(
            map(() =>  loadDeleteMiembroSuccess({id: data})),
            catchError((error: any) => of(loadDeleteMiembroFailed({error})))
        ))
    ))
}