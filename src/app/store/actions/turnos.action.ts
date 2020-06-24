import { createAction, props } from '@ngrx/store';
import { Turno } from 'src/app/interfaces/turno.interface';

//GET TURNOS ACTIONS
export const loadGetTurnos = createAction(
    '[TURNOS] Load Get Turnos',
    props<{id:string, counter:number}>()
); 
export const loadGetTurnosSuccess = createAction(
    '[TURNOS] Load Get Turnos Success',
    props<{turnos:Turno[]}>()
); 
export const loadGetTurnosFailed = createAction(
    '[TURNOS] Load Get Turnos Failed',
    props<{error:any}>()
);

//ADD TURNO ACTIONS
export const loadAddTurno = createAction(
    '[TURNOS] Load Add Turno',
    props<{especialistaId:string, turno:Turno}>()
); 
export const loadAddTurnoSuccess = createAction(
    '[TURNOS] Load Add Turno Success',
    props<{turno:Turno}>()
); 
export const loadAddTurnoFailed = createAction(
    '[TURNOS] Load Add Turno Failed',
    props<{error:any}>()
);

//UPDATE SINGLE TURNO ACTIONS
export const loadUpdateSingleTurno = createAction(
    '[TURNOS] Load Update Single Turno',
    props<{especialistaId:string, turno:Turno}>()
); 
export const loadUpdateSingleTurnoSuccess = createAction(
    '[TURNOS] Load Update Single Turno Success',
    props<{turno:Turno}>()
); 
export const loadUpdateSingleTurnoFailed = createAction(
    '[TURNOS] Load Update Single Turno Failed',
    props<{error:any}>()
);

//DELETE SINGLE TURNO ACTIONS
export const loadDeleteSingleTurno = createAction(
    '[TURNOS] Load Delete Single Turno',
    props<{especialistaId:string, turno:Turno}>()
); 
export const loadDeleteSingleTurnoSuccess = createAction(
    '[TURNOS] Load Delete Single Turno Success',
    props<{turnoId:string}>()
); 
export const loadDeleteSingleTurnoFailed = createAction(
    '[TURNOS] Load Delete Single Turno Failed',
    props<{error:any}>()
);

//GET TURNO BY PACIENT LASTNAME ACTION
export const loadGetTurnoByPacientLastname = createAction(
    '[TURNOS] Load Turno By Pacient Lastname',
    props<{especialistaId:string ,startValue:any ,endValue:any, tableType: 'Especialistas' | 'Turnos Pasados'}>()
); 
export const loadGetTurnoByPacientLastnameSuccess = createAction(
    '[TURNOS] Load Turno By Pacient Lastname Success',
    props<{turnos:Turno[]}>()
); 
export const loadGetTurnoByPacientLastnameFailed = createAction(
    '[TURNOS] Load Turno By Pacient Lastname Failed',
    props<{error:any}>()
);

//GET TURNOS PASADOS ACTIONS
export const loadGetTurnosPasados = createAction(
    '[TURNOS] Load Get Turnos Pasados',
    props<{especialistaId:string, counter:number}>()
);
export const loadGetTurnosPasadosSuccess = createAction(
    '[TURNOS] Load Get Turnos Pasados Success',
    props<{turnos:Turno[]}>()
);
export const loadGetTurnosPasadosFailed = createAction(
    '[TURNOS] Load Get Turnos Pasados Failed',
    props<{error:any}>()
);

//GET TURNOS FROM (DATE) TO (DATE)
export  const loadGetTurnosFromTo = createAction(
    '[TURNOS] Load Get Turnos From To',
    props<{especialistaId:string, from?:number, to?:number}>()
);
export const loadGetTurnosFromToSuccess = createAction(
    '[TURNOS] Load Get Turnos From To Success',
    props<{turnos:Turno[]}>()
);
export  const loadGetTurnosFromToFailed = createAction(
    '[TURNOS] Load Get Turnos From To Failed',
    props<{error:any}>()
);


//RESET TURNO LIST ACTIONS
export const loadResetTurnoList = createAction(
    '[TURNOS] Load Reset Turno List'
);

export const isNoFiltering = createAction(
    '[TURNOS] Is No Filtering'
);