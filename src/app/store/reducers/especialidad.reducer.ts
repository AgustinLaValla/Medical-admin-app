import { Especialidad } from 'src/app/interfaces/especialidad.interface';
import * as fromESPECIALIDAD from '../actions/especialidad.action';
import { createReducer, Action, on } from '@ngrx/store';

export interface EspecialidadState {
    especialidad: Especialidad,
    error: any
};

const initialState: EspecialidadState = {
    especialidad: null,
    error: null
};

const reducer = createReducer(
    initialState,
    //Load Epecialidad
    on(fromESPECIALIDAD.loadGetEspecialidadSuccess, (state, action) => {
        return {
            ...state,
            especialidad: { ...action.especialidad }
        }
    }),
    on(fromESPECIALIDAD.loadGetEspecialidadFailed, (state, action) => {
        return {
            ...state,
            error: { ...action.error }
        }
    }),

    //Load Get Especialidad
    on(fromESPECIALIDAD.loadAddServicioSuccess, (state, action) => {
        return {
            ...state,
            especialidad: {
                ...state.especialidad,
                servicios: [...state.especialidad.servicios,
                action.value
                ]
            }
        }
    }),
    on(fromESPECIALIDAD.loadAddServicioFailed, (state, action) => {
        return {
            ...state,
            error: { ...action.error }
        }
    }),

    //Load Delete Servicio
    on(fromESPECIALIDAD.loadDeleteServicioSuccess, (state, action) => {
        return {
            ...state,
            especialidad: {
                ...state.especialidad,
                servicios: state.especialidad.servicios.filter(servicio => servicio != action.value)
            }
        }
    }),
    on(fromESPECIALIDAD.loadDeleteServicioFailed, (state, action) => {
        return {
            ...state,
            error: { ...action.error }
        }
    }),
    //Load Update Servicio
    on(fromESPECIALIDAD.loadUpdateServicioSuccess, (state, action) => {
        return {
            ...state,
            especialidad: {
                ...state.especialidad,
                servicios: [...action.newValue]
            }
        }
    }),
    on(fromESPECIALIDAD.loadUpdateServicioFailed, (state, action) => {
        return {
            ...state,
            error: { ...action.error }
        }
    }),
    //Load Get Especialidad By Its Name
    on(fromESPECIALIDAD.loadGetEspecialidadByItsNameSuccess, (state, action) => {
        return {
            ...state,
            especialidad: { ...action.especialidad }
        }
    }),
    on(fromESPECIALIDAD.loadGetEspecialidadByItsNameFailed, (state, action) => {
        return {
            ...state,
            error: { ...action.error }
        }
    }),

    //Reset Especialidad
    on(fromESPECIALIDAD.loadResetEspecialidad, (state) => {
        return {
            ...state,
            especialidad:null
        }
    })
);

export function especialidadReducer(state: EspecialidadState | undefined, action: Action): EspecialidadState {
    return reducer(state, action)
};

export const getEspecialidadSelector = (state: EspecialidadState) => state.especialidad;
