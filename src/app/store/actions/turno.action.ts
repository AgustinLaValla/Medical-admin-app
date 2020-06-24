import { props, createAction } from '@ngrx/store';
import { Turno } from 'src/app/interfaces/turno.interface';

//GET SINGLE TURNO ACTIONS
export const loadGetSingleTurno = createAction(
    '[TURNO] Load Get Single Turno',
    props<{especialistaId:string, turnoId:string}>()
);
export const loadGetSingleTurnoSuccess = createAction(
    '[TURNO] Load Get Single Turno Success',
    props<{turno:Turno}>()
);
export const loadGetSingleTurnoFailed = createAction(
    '[TURNO] Load Get Single Turno Failed',
    props<{error:any}>()
);

//RESET TURNO ACTION
export const loadResetTurno = createAction(
    '[TURNO] Load Reset Turno',
);

