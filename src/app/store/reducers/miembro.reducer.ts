import * as fromMIEMBRO from '../actions/miembro.action';
import { Miembro } from '../../interfaces/miembro.interface';
import { Action, createReducer, on } from '@ngrx/store';

export interface MiembroState {
    miembro: Miembro,
    error:any
};

const initialState: MiembroState = {
    miembro: null,
    error: null
}; 

const reducer = createReducer(
    initialState,
    //Get Miembro
    on(fromMIEMBRO.loadGetMiembroSuccess, (state,action) => {
        return { 
            ...state,
            miembro: {...action.miembro}
        }
    }),
    on(fromMIEMBRO.loadGetMiembroFailed, (state,action) => {
        return {
            ...state,
            error: {...action.error}
        }
    }),
    
    //Reset Miembro Values
    on(fromMIEMBRO.loadResetMiembro, (state) => {
        return {
            ...state,
            miembro: null
        }
    }),
    //Update Miembro
    on(fromMIEMBRO.loadUpdateMiembroSuccess, (state,action) => {
        return {
            ...state,
            miembro: (action.image) ? {...action.miembro, photoURL: action.image} : {...action.miembro}
        }
    }),
    on(fromMIEMBRO.loadUpdateMiembroFailed, (state,action) => {
        return {
            ...state,
            error: {...action.error}
        }
    })
);


export function miembroReducer(state:MiembroState | undefined, action: Action): MiembroState { 
    return reducer(state, action);
};

export const getMiembroSelector = (state: MiembroState) => state.miembro;
export const getMiembroErrorSelector = (state: MiembroState) => state.error;