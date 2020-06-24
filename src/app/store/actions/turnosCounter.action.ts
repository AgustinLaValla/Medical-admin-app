import { createAction, props } from '@ngrx/store';

//GET TURNOS COUNTER ACTIONS
export const loadGetTurnosCounter = createAction(
    '[TURNOS COUNTER] Load Get Turnos Counter',
    props<{especialistaId:string}>()
);
export const loadGetTurnosCounterSuccess = createAction(
    '[TURNOS COUNTER] Load Get Turnos Counter Success',
    props<{totalTurnos:number}>()
);
export const loadGetTurnosCounterFailed = createAction(
    '[TURNOS COUNTER] Load Get Turnos Counter Failed',
    props<{error:any}>()
);

//GET TURNOS COUNTER ACTIONS
export const loadGetTurnosConcretadosLength = createAction(
    '[TURNOS COUNTER] Load Get Turnos Concretados Length',
    props<{especialistaId:string}>()
);
export const loadGetTurnosConcretadosLengthSuccess = createAction(
    '[TURNOS COUNTER] Load Get Turnos Concretados Length Success',
    props<{totalTurnos:number}>()
);
export const loadGetTurnosConcretadosLengthFailed = createAction(
    '[TURNOS COUNTER] Load Get Turnos Concretados Length Failed',
    props<{error:any}>()
);
