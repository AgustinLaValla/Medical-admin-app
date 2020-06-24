import * as fromTURNO from '../actions/turno.action';
import { Turno } from 'src/app/interfaces/turno.interface';
import { ActionCreator, createReducer, on } from '@ngrx/store';

export interface TurnoState { 
    turno: Turno,
    error: any
}

const initialState: TurnoState = {
    turno: null,
    error: null
}

const reducer = createReducer(
    initialState,
    //Get Single Turno
    on(fromTURNO.loadGetSingleTurnoSuccess, (state,action) => {
        return {
            ...state,
            turno: {...action.turno}
        }
    }),
    on(fromTURNO.loadGetSingleTurnoFailed, (state,action) => {
        return {
            ...state,
            error: {...action.error}
        }
    }),
    //Reset single turnos values
    on(fromTURNO.loadResetTurno, (state) => {
        return {
            ...state,
            turno: null
        }
    })
)



export function turnoReducer(state: TurnoState | undefined, action:ActionCreator): TurnoState { 
    return reducer(state,action)
}


export const getSingleTurnoSelector = (state:TurnoState) => state.turno;
export const getSingleTurnoErrorSelector = (state:TurnoState) => state.error;