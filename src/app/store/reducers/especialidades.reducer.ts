import { Especialidad } from '../../interfaces/especialidad.interface';
import * as fromEspecialidades from '../actions/especialidades.action';
import { createReducer, on, Action } from '@ngrx/store';

export interface EspecialidadesState {
    especialidades: Especialidad[],
    error:any
};

const initialState:EspecialidadesState = {
    especialidades: [],
    error: null
};

const reducer = createReducer(
    initialState,
    //Get Especialidades
    on(fromEspecialidades.loadGetEspecialidadesSuccess, (state,action) => {
        return {
            ...state,
            especialidades: [...action.especialidades.map((esp:Especialidad) => esp)]
        }
    }),
    on(fromEspecialidades.loadGetEspecialidadesFailed, (state,action) => {
        return {
            ...state,
            error: {...action.error}
        }
    }),

    //Add Especialidades
    on(fromEspecialidades.loadAddEspecialidadSuccess, (state,action) => {
        return { 
            ...state,
            especialidades: [...state.especialidades, {...action.newEspecialidad, id:action.id}]
        }
    }),
    on(fromEspecialidades.loadAddEspecialidadFailed, (state,action) => {
        return {
            ...state,
            error: {...action.error}
        }
    }),

    //Delete Especialidades
    on(fromEspecialidades.loadDeleteEspecialidadSuccess, (state,action) => {
        return { 
            ...state,
            especialidades:[...state.especialidades.filter(especialidad => especialidad.id != action.id)]
        }
    }),

    //Reset Especialidades
    on(fromEspecialidades.loadResetEspecialidadesStore, (state) => {
        return {
            ...state,
            especialidades: []
        };
    })
);


export function especialidadesReducer(state:EspecialidadesState | undefined, action: Action): EspecialidadesState {
    return reducer(state,action);
 };

export const getEspecialidadesSelector = (state:EspecialidadesState) => state.especialidades;
export const getEspecialidadesErrorSelector = (state:EspecialidadesState) => state.error;