import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MutualesService } from '../../services/mutuales.service';
import { switchMap, map, catchError, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { loadGetMutuales, loadGetMutualesSuccess, loadGetMutualesFailed, loadAddMutual, loadAddMutualSuccess, loadAddMutualFailed, loadUpdateMutual, loadDeleteMutual } from '../actions';
import { Mutual } from 'src/app/interfaces/mutual.interface';


@Injectable()
export class MutualesEffects {
    constructor(private action$: Actions, private mutualesService: MutualesService) { }

    loadGetMutuales$ = createEffect(() => this.action$.pipe(
        ofType(loadGetMutuales),
        switchMap(() => this.mutualesService.getMutuales().pipe(
            map((mutuales: Mutual[]) => loadGetMutualesSuccess({ mutuales })),
            catchError(error => of(loadGetMutualesFailed({error})))
        ))
    ));

    loadAddMutual$ = createEffect(() => this.action$.pipe(
        ofType(loadAddMutual),
        switchMap(({ mutual }) => of(this.mutualesService.addMutual(mutual)).pipe(
            catchError((error) => of(loadAddMutualFailed({error})))
        ))
    ),{dispatch:false})

    loadUpdateMutual$ = createEffect(() => this.action$.pipe(
        ofType(loadUpdateMutual),
        switchMap(({ mutual }) => of(this.mutualesService.updateMutual(mutual)))
    ), { dispatch: false });

    loadDeleteMutual$ = createEffect(() => this.action$.pipe(
        ofType(loadDeleteMutual),
        switchMap(({ mutualId }) => of(this.mutualesService.deleteMutual(mutualId)))
    ), { dispatch: false });

};