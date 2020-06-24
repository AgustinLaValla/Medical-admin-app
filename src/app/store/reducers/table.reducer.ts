import * as fromTABLE from '../actions/table.actions';
import { Action, createReducer, on } from '@ngrx/store';

export interface TableState {
    open:boolean;
    id:string,
    counter: number,
    tableType: 'Especialistas' | 'Turnos Pasados';
    backgroundLayer:boolean;
};

const initialState: TableState = {
    open: false,
    id:null,
    counter: 0,
    tableType: null,
    backgroundLayer: false
};

const reducer = createReducer(
    initialState,
    on(fromTABLE.loadOpenTable, (state,action) => {
        return {
            open: true,
            id: action.especialistaId,
            tableType: action.tableType,
            counter: action.counter,
            backgroundLayer: true
        }
    }),
    on(fromTABLE.loadCloseTable, (state,action) => {
        return {
            open:false,
            id: null,
            counter: 0,
            tableType: null,
            backgroundLayer: false
        }
    }),
    on(fromTABLE.loadIncrementCounter, (state,action) => {
        return {
            ...state,
            counter: state.counter + action.value
        }
    })
);


export function tableReducer(state:TableState | undefined, action: Action):TableState { 
    return reducer(state,action);
};

 export const openTableSelector = (state:TableState) => state.open;
 export const idSelector = (state:TableState) => state.id;
 export const counterSelector = (state:TableState) => state.counter;
 export const backgroundLayerSelector = (state:TableState) => state.backgroundLayer;
 export const tableTyoeSelector = (state:TableState) => state.tableType;