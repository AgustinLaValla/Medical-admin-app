import { Action, createAction, props } from '@ngrx/store';
import { Especialidad } from 'src/app/interfaces/especialidad.interface';

//GET SINGLE ESPECIALIDAD ACTIONS
export const loadGetEspecialidad = createAction(
    '[ESPECIALIDAD] Load Get Especialidad',
    props<{id:string}>()
);
export const loadGetEspecialidadSuccess = createAction(
    '[ESPECIALIDAD] Load Get Especialidad Success',
    props<{especialidad: Especialidad}>()

);
export const loadGetEspecialidadFailed = createAction(
    '[ESPECIALIDAD] Load Get Especialidad Failed',
    props<{error:any}>()
);

//ADD SERVICIO TO ESPECIALIDAD ACTIONS
export const loadAddServicio = createAction(
    '[ESPECIALIDAD] Load Add Servicio',
    props<{id:string, value:string}>()
);
export const loadAddServicioSuccess = createAction(
    '[ESPECIALIDAD] Load Add Servicio Success',
    props<{id:string, value:string}>()

);
export const loadAddServicioFailed = createAction(
    '[ESPECIALIDAD] Load Add Servico Failed',
    props<{error:any}>()
);


//DELETE SERVICIO OF ESPECIALIDAD ACTIONS
export const loadDeleteServicio = createAction(
    '[ESPECIALIDAD] Load Delete Servicio',
    props<{id:string, value:string}>()
);
export const loadDeleteServicioSuccess = createAction(
    '[ESPECIALIDAD] Load Delete Servicio Success',
    props<{ value:string}>()

);
export const loadDeleteServicioFailed = createAction(
    '[ESPECIALIDAD] Load Delete Servico Failed',
    props<{error:any}>()
);


//UPDATE SERVICIO OF ESPECIALIDAD ACTIONS
export const loadUpdateServicio = createAction(
    '[ESPECIALIDAD] Load Update Servicio',
    props<{id:string, newValue:string, oldValue:string}>()
);
export const loadUpdateServicioSuccess = createAction(
    '[ESPECIALIDAD] Load Update Servicio Success',
    props<{newValue:string[]}>()

);
export const loadUpdateServicioFailed = createAction(
    '[ESPECIALIDAD] Load Update Servicio Failed',
    props<{error:any}>()
);


//GET ESPECIALIDAD BY ITS NAME ACTIONS
export const loadGetEspecialidadByItsName = createAction(
    '[ESPECIALIDAD] Load Get Especialidad By Its Name',
    props<{nombreEspeciliadad:string}>()
);
export const loadGetEspecialidadByItsNameSuccess = createAction(
    '[ESPECIALIDAD] Load Get Especialidad By Its Name Success',
    props<{especialidad: Especialidad}>()

);
export const loadGetEspecialidadByItsNameFailed = createAction(
    '[ESPECIALIDAD] Load Get Especialidad By Its Name Failed',
    props<{error:any}>()
);

//LOAD RESET ESPECIALIDAD ACTIONS
export const loadResetEspecialidad = createAction(
    '[ESPCIALIDAD] Load Reset Especialidad'
);

