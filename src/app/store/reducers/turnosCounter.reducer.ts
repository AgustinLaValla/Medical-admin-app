import * as fromTURNOS_COUNTER from '../actions/turnosCounter.action';
import { Action, createReducer, on } from '@ngrx/store';

export interface TurnosCounterState { 
    total_turnos: number,
    turnos_concretados_length:number;
    error: any;
}
const initialState: TurnosCounterState = {
    total_turnos: 0,
    turnos_concretados_length:0,
    error: null
}

const reducer = createReducer(
    initialState,
    //GET TURNOS COUNTER
    on(fromTURNOS_COUNTER.loadGetTurnosCounterSuccess, (state,action) => {
        return {
            ...state,
            total_turnos: action.totalTurnos
        }
    }),
    on(fromTURNOS_COUNTER.loadGetTurnosCounterFailed, (state,action) => {
        return {
            ...state,
            error: {...action.error}
        }
    }),

    //Turnos concretados length
    on(fromTURNOS_COUNTER.loadGetTurnosConcretadosLengthSuccess, (state,action) => {
        return {
            ...state,
            turnos_concretados_length: action.totalTurnos
        }
    })
);


export function turnosCounterReducer(state: TurnosCounterState | undefined, action: Action): TurnosCounterState { 
    return reducer(state,action);
};

export const turnosCounterSelector = (state:TurnosCounterState) => state.total_turnos;
export const turnosConcretadosSelector = (state:TurnosCounterState) => state.turnos_concretados_length;