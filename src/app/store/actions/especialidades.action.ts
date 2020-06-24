import { Action, createAction, props } from '@ngrx/store';
import { Especialidad } from 'src/app/interfaces/especialidad.interface';

//GET ESPECIALIDADES ACTION 
export const loadGetEspecialidades = createAction(
    '[ESPECIALIDADES] Load Get Especialidades',
);
export const loadGetEspecialidadesSuccess = createAction(
    '[ESPECIALIDADES] Load Get Especialidades Success',
    props<{especialidades: Especialidad[]}>()
);
export const loadGetEspecialidadesFailed = createAction(
    '[ESPECIALIDADES] Load Get Especialidades Failed',
    props<{error:any}>()
);


//ADD ESPECIALIDAD ACTION 
export const loadAddEspecialidad = createAction(
    '[ESPECIALIDADES] Load Add Especialidad',
    props<{newEspecialidad: Especialidad}>()
);
export const loadAddEspecialidadSuccess = createAction(
    '[ESPECIALIDADES] Load Add Especialidad Success',
    props<{newEspecialidad: Especialidad , id:string}>()
);
export const loadAddEspecialidadFailed = createAction(
    '[ESPECIALIDADES] Load Add Especialidad Failed',
    props<{error:any}>()
);

//DELETE ESPECIALIDAD ACTION 
export const loadDeleteEspecialidad = createAction(
    '[ESPECIALIDADES] Load Delete Especialidad',
    props<{id:string}>()
);
export const loadDeleteEspecialidadSuccess = createAction(
    '[ESPECIALIDADES] Load Delete Especialidad Success',
    props<{id:string}>()
);
export const loadDeleteEspecialidadFailed = createAction(
    '[ESPECIALIDADES] Load Delete Especialidad Failed',
    props<{error:any}>()
);

//Reset Especialidades Store Actions
export const loadResetEspecialidadesStore = createAction(
    '[ESPECIALIDADES] Load Reset Especialidades'
);
