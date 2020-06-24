import * as fromPACIENT from '../actions/pacient.action';
import { Pacient } from 'src/app/interfaces/pacient.interface';
import { createReducer, Action, on } from '@ngrx/store';

export interface PacientState { 
    pacient: Pacient;
    error:any;
};

const initialState:PacientState = {
    pacient: null,
    error: null
};

const reducer = createReducer(
    initialState,
    //Get Pacient
    on(fromPACIENT.loadGetSinglePacientSuccess, (state,action) => {
        return {
            ...state,
            pacient: {...action.pacient}
        }
    }),
    on(fromPACIENT.loadGetSinglePacientFailed, (state,action) => {
        return {
            ...state,
            error: {...action.error}
        }
    }),

    //Update Pacient
    on(fromPACIENT.loadUpdateSinglePacientInfoSuccess, (state,action) => {
        return { 
            ...state,
            pacient: {...action.newPacientData}
        }
    }),
    on(fromPACIENT.loadUpdateSinglePacientInfoFailed, (state,action) => {
        return { 
            ...state,
            error: {...action.error}
        }
    }),
    //Get Pacient By Dni
    on(fromPACIENT.loadGetPacientByDNISuccess, (state,action) => {
        return {
            ...state, 
            pacient: {...action.pacient}
        }
    }),
    on(fromPACIENT.loadGetPacientByDNIFailed, (state,action) => {
        return {
            ...state, 
            error: {...action.error}
        }
    }),
    on(fromPACIENT.loadResetPacientStoreData, (state) => {
        return {
            ...state,
            pacient: null
        };
    })
);

export function pacientReducer(state:PacientState | undefined, action: Action):PacientState { 
    return reducer(state,action);
};

//Selecctors
export const getPacientSelector = (state:PacientState) => state.pacient;
export const getPacientErrorSelector = (state:PacientState) => state.error;