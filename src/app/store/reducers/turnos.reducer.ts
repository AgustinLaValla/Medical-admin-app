import * as fromTURNOS from '../actions/turnos.action';
import { Turno } from 'src/app/interfaces/turno.interface';
import { Action, createReducer, on } from '@ngrx/store';

export interface TurnosState {
    turnos: Turno[],
    isFiltering:boolean,
    error: any
};

const initialState: TurnosState = {
    turnos: [],
    isFiltering:false,
    error: null
};

const reducer = createReducer(
    initialState,
    //GET TURNOS
    on(fromTURNOS.loadGetTurnosSuccess, (state,action) => {
        return {
            ...state,
            turnos: [...action.turnos],
            isFiltering:false

        };
    }),
    on(fromTURNOS.loadGetTurnosFailed, (state,action)=> {
        return {
            ...state,
            error: {...action.error}
        }
    }),
    
    //ADD TURNO
    on(fromTURNOS.loadAddTurnoSuccess, (state,action) => {
        return {
            ...state,
            turnos: [...state.turnos, { ...action.turno }]
        };
    }),
    on(fromTURNOS.loadAddTurnoFailed, (state,action) => {
        return {
            ...state,
            error: {...action.error}
        }
    }),

    //UPDATE SINGLE TURNO
    on(fromTURNOS.loadUpdateSingleTurnoSuccess, (state,action) => {
        let turnosListUpdated = state.turnos.filter((turno: Turno) => {
            if(turno.id == action.turno.id) {
                return {...action.turno};
            }else{
                return turno;
            }
        });
        return {
            ...state,
            turnos: turnosListUpdated
        };
    }),
    on(fromTURNOS.loadUpdateSingleTurnoFailed, (state,action) => {
        return {
            ...state,
            error: {...action.error}
        }
    }),

    //DELETE TURNO
    on(fromTURNOS.loadDeleteSingleTurnoSuccess, (state,action) => {
        return { 
            ...state,
            turnos: state.turnos.filter((turno: Turno) => turno.id != action.turnoId)
        }
    }),
    on(fromTURNOS.loadDeleteSingleTurnoFailed, (state,action) => { 
        return {
            ...state,
            error: {...action.error}
        }
    }),

    //GET TURNO BY PACIENTE NAME
    on(fromTURNOS.loadGetTurnoByPacientLastnameSuccess, (state,action) => {
        return {
            ...state,
            turnos: [...action.turnos],
            isFiltering:true
        };
    }),
    on(fromTURNOS.loadGetTurnoByPacientLastnameFailed, (state,action) => {
        console.log(action.error);
        return {
            ...state,
            error: {...action.error}
        }
    }),

    //Get Turnos Pasados 
    on(fromTURNOS.loadGetTurnosPasadosSuccess, (state,action) => {
        return {
            ...state,
            turnos: [...action.turnos],
            isFiltering: false
        };
    }),
    on(fromTURNOS.loadGetTurnosPasadosFailed, (state,action) => {
        return {
            ...state,
            error: {...action.error}
        };
    }),

    //Get Turnos from To
    on(fromTURNOS.loadGetTurnosFromToSuccess, (state, action) => {
        return {
            ...state,
            turnos: [...action.turnos]
        };
    }),
    on(fromTURNOS.loadGetTurnosFromToFailed, (state, action) => {
        return {
            ...state,
            error:{...action.error}
        }
    }),

    //Reset Turno List
    on(fromTURNOS.loadResetTurnoList, (state) => {
        return { 
            ...state,
            turnos:null
        };
    }),

    on(fromTURNOS.isNoFiltering, (state) =>  {
        return {
            ...state,
            isFiltering:false
        }
    })
);


export function turnosReducer(state:TurnosState, action: Action): TurnosState { 
    return reducer(state,action);
}

export const getTurnosSelector = (state: TurnosState) => state.turnos;
export const getTurnosErrorSelector = (state: TurnosState) => state.error;