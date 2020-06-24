import { createReducer, Action, on } from '@ngrx/store';
import * as fromPACIENT_TABLE from '../actions/pacient-table.actions';

export interface PacientTable { 
    open:boolean;
};

const initialState: PacientTable = { 
    open:false
};

const reducer = createReducer(
    initialState,
    on(fromPACIENT_TABLE.openPacientTable, (state,action) => {
        return {
            open: true
        };
    }),
    on(fromPACIENT_TABLE.closePacientTable, (state, action) => {
        return {
            open:false
        };
    })
);

export function pacientTableReducer(state:PacientTable = initialState, action:Action):PacientTable {
    return reducer(state,action);
 };

 //pacient Table Selector
export const openPacientTableSelector = (state:PacientTable) => state.open;