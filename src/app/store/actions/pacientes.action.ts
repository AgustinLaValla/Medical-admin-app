import { createAction, props } from '@ngrx/store';
import { Pacient } from 'src/app/interfaces/pacient.interface';

//GET PACIENTES ACTIONS
export const loadGetPacients = createAction(
    '[PACIENTES] Load Get Pacientes',
    props<{count:number}>()
);
export const loadGetPacientsSuccess = createAction(
    '[PACIENTES] Load Get Pacientes Success',
    props<{pacientes:Pacient[]}>()
);
export const loadGetPacientsFailed = createAction(
    '[PACIENTES] Load Get Pacientes Failed',
    props<{error:any}>()
);

//UPDATE PACIENTES ACTIONS
export const loadUpdatePacient = createAction(
    '[PACIENTES] Load Update Pacientes',
    props<{paciente:Pacient}>()
);
export const loadUpdatePacientSuccess = createAction(
    '[PACIENTES] Load Update Pacientes Success',
    props<{paciente:Pacient}>()
);
export const loadUpdatePacientFailed = createAction(
    '[PACIENTES] Load Update Pacientes Failed',
    props<{error:any}>()
);

//DELETE PACIENTES ACTIONS
export const loadDeletePacient = createAction(
    '[PACIENTES] Load Delete Pacientes',
    props<{paciente:Pacient}>()
);
export const loadDeletePacientSuccess = createAction(
    '[PACIENTES] Load Delete Pacientes Success',
    props<{pacienteId:string}>()
);
export const loadDeletePacientFailed = createAction(
    '[PACIENTES] Load Delete Pacientes Failed',
    props<{error:any}>()
);

//GET PACIENT BY LASTNAME ACTIONS
export const loadGetPacientByLastname = createAction(
    '[PACIENTES] Load Get Paciente By Lastname',
    props<{startValue:any, endValue:any}>()
);
export const loadGetPacientByLastnameSuccess = createAction(
    '[PACIENTES] Load Get Pacientes By Lastname Success',
    props<{pacients:Pacient[]}>()
);
export const loadGetPacienteByLastnameFailed = createAction(
    '[PACIENTES] Load Get Pacientes By Lastaname Failed',
    props<{error:any}>()
);

//RESET PACIENT LIST ACTIONS
export const loadResetPacientList = createAction(
    '[PACIENTES] Load Reset Pacient List'
);

//GET PACIENTES COUNTER 
export const loadGetPacientsCounter = createAction(
    '[PACIENTES] Load Get Pacientes Counter',
);
export  const loadGetPacientsCounterSuccess = createAction(
    '[PACIENTES] Load Get Pacientes Counter Success',
    props<{pacientsCounter:number}>()
);
export const loadGetPacientsCounterFailed = createAction(
    '[PACIENTES] Load Get Pacientes Counter Failed',
    props<{error:any}>()
);