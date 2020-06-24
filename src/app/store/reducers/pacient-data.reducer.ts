import { createReducer, Action, on } from '@ngrx/store';
import * as fromPACIENT_DATA from '../actions/pacient-data.actions';

export interface PacientDataState { 
    show:boolean;
    pacientId:string;
};

const initialState:PacientDataState = {
    show:false,
    pacientId: null
};

const reducer = createReducer(
    initialState,
    on(fromPACIENT_DATA.showPacientData, (state,action) => {
        return {
            show:true,
            pacientId: action.pacientId
        };
    }),
    on(fromPACIENT_DATA.hidePacientData, (state) => {
        return {
            show:false,
            pacientId: null
        };
    })
);

export function pacientDataReducer(state:PacientDataState | undefined, action:Action): PacientDataState { 
    return reducer(state,action);
}

export const pacientDataSelector = (state:PacientDataState) => state.show;
export const pacientDataIdSelector = (state:PacientDataState) => state.pacientId;