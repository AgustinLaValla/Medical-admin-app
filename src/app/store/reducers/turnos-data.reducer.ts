import { Action, createReducer, on } from '@ngrx/store';
import * as fromTurnosData from '../actions/turnos-data.action';

export interface TurnosDataState {
    show:boolean;
    especialistaId:string;
};

const initialState: TurnosDataState = {
    show:false,
    especialistaId:null
};

const reducer = createReducer(
    initialState,
    on(fromTurnosData.ShowTurnosData, (state,action) => {
        return {
            show:true,
            especialistaId: action.especialistaId
        }
    }),
    on(fromTurnosData.HideTurnosData, (state,action) => {
        return {
            show:false,
            especialistaId:null
        }
    })
);

export function turnosDataReducer(state:TurnosDataState | undefined, action:Action): TurnosDataState { 
    return reducer(state, action);
};