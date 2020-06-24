import { Mutual } from 'src/app/interfaces/mutual.interface';
import { Action, createReducer, on } from '@ngrx/store';
import { loadGetMutualesSuccess, loadGetMutualesFailed, loadAddMutualSuccess, loadAddMutualFailed, loadUpdateMutualSuccess, loadUpdateMutualFailed, loadDeleteMiembroSuccess, loadDeleteMutualSuccess, loadDeleteMutualFailed } from '../actions';

export interface MutualesState {
    mutuales: Mutual[],
    error: any
};

const initialState: MutualesState = {
    mutuales: [],
    error: null
};

const reducer = createReducer(
    initialState,

    //GET MUTUALES
    on(loadGetMutualesSuccess, (state,action) => {
        return {
            ...state,
            mutuales:action.mutuales
        }
    }),
    on(loadGetMutualesFailed, (state,action) => {
        return {
            ...state,
            error:{...action.error}
        }
    }),

    //ADD MUTUAL
    on(loadAddMutualSuccess,(state,action) => {
        return {
            ...state,
            mutuales: [...state.mutuales, {...action.mutual, id:action.mutualId}]
        }
    }),
    on(loadAddMutualFailed, (state,action) => {
        return {
            ...state,
            error:{...action.error}
        }
    }),

    //UPDATED MUTUAL
    on(loadUpdateMutualSuccess,(state,action) => {
        return {
            ...state,
            mutuales: state.mutuales.map((mutual) => {
                if(mutual.id === action.mutual.id) { 
                    return action.mutual;
                } else { 
                    return mutual;
                };
            })
        }
    }),
    on(loadUpdateMutualFailed,(state,action) => {
        return {
            ...state,
            error:{...action.error}
        }
    }),

    //DELETE MUTUAL
    on(loadDeleteMutualSuccess, (state,action) => {
        return{
            ...state,
            mutuales: state.mutuales.filter(mutual => mutual.id !== action.mutualId)
        }
    }),
    on(loadDeleteMutualFailed, (state,action) => {
        return {
            ...state,
            error: {...action.error}
        }
    })
);

export function mutualReducer(state: MutualesState | undefined, action: Action): MutualesState {
    return reducer(state,action);
};