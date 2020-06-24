import { createAction, props } from '@ngrx/store';
import { Pacient } from 'src/app/interfaces/pacient.interface';

//GET SINGLE PACIENT ACTIONS
export const loadGetSinglePacient = createAction(
    '[PACIENTES] Load Get Single Pacient',
    props<{pacientId:string}>()
);
export const loadGetSinglePacientSuccess = createAction(
    '[PACIENTES] Load Get Single Pacient Success',
    props<{pacient: Pacient}>()
);
export const loadGetSinglePacientFailed = createAction(
    '[PACIENTES] Load Get Single Pacient Failed',
    props<{error:any}>()
);

//UPDATE SINGLE PACIENT INFO ACTIONS
export const loadUpdateSinglePacientInfo = createAction(
    '[PACIENTES] Load Update Single Pacient Info',
    props<{oldPacientData:Pacient, newPacientData:Pacient}>()
);
export const loadUpdateSinglePacientInfoSuccess = createAction(
    '[PACIENTES] Load Update Single Pacient Info Success',
    props<{newPacientData:Pacient}>()
);
export const loadUpdateSinglePacientInfoFailed = createAction(
    '[PACIENTES] Load Update Single Pacient Info Failed',
    props<{error:any}>()
);

//Get Pacient By Its DNI
export const loadGetPacientByDNI = createAction(
    '[PACIENTES] Load Get Pacient By DNI',
    props<{dni:string}>()
);
export const loadGetPacientByDNISuccess = createAction(
    '[PACIENTES] Load Get Pacient By DNI Success',
    props<{pacient:Pacient}>()
);
export const loadGetPacientByDNIFailed = createAction(
    '[PACIENTES] Load Get Pacient By DNI Failed',
    props<{error:any}>()
);




//Reset Pacient Store Data
export const loadResetPacientStoreData = createAction(
    '[PACIENTES] Load Reset Pacient Store Data'
);