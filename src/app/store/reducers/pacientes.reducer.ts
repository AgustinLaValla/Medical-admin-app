import { Pacient } from 'src/app/interfaces/pacient.interface';
import { createReducer, Action, on } from '@ngrx/store';
import * as fromPACIENTES from '../actions/pacientes.action';

export interface PacientesState { 
    pacientes: Pacient[];
    error: any,
    counter:number
};

const initialState:PacientesState = {
    pacientes: [],
    error:null,
    counter: 0
};

const reducer = createReducer(
    initialState,
    //Get Pacientes
    on(fromPACIENTES.loadGetPacientsSuccess, (state,action) => {
        return {
            ...state,
            pacientes: [...action.pacientes]
        }
    }),
    on(fromPACIENTES.loadGetPacientsFailed, (state,action) => {
        return {
            ...state,
            error: {...action.error}
        }
    }),

    //Update Pacientes
    on(fromPACIENTES.loadUpdatePacientSuccess, (state,action)=> {
        let pacientLisUpdated = state.pacientes.filter((paciente:Pacient) => {
            if( paciente.id == action.paciente.id) { 
                return action.paciente;
            }else{
                return paciente;
            }
        });

        return { 
            ...state,
            pacientes: pacientLisUpdated
        }
    }),
    on(fromPACIENTES.loadUpdatePacientFailed, (state,action) => {
        return {
            ...state,
            error: {...action.error}
        }
    }),

    //Delete Paciente
    on(fromPACIENTES.loadDeletePacient, (state,action) => {
        return {
            ...state,
            pacientes: state.pacientes.filter(paciente => paciente.id != action.paciente.id)
        }
    }),
    on(fromPACIENTES.loadDeletePacientFailed, (state,action) => {
        return {
            ...state,
            error: {...action.error}
        }
    }),

    //Get Pacientes By Last Name
    on(fromPACIENTES.loadGetPacientByLastnameSuccess, (state,action) => {
        return { 
            ...state, 
            pacientes: [...action.pacients]
        };
    }),
    on(fromPACIENTES.loadResetPacientList, (state) => {
        return {
            ...state,
            pacientes: null
        };
    }),
    on(fromPACIENTES.loadGetPacientsCounterSuccess, (state,action) => { 
        return {
            ...state,
            counter: action.pacientsCounter
        }
    })
);

export function pacientesReducer(state:PacientesState | undefined, action:Action): PacientesState{ 
    return reducer(state,action);
}

//Selectors
export const pacientesSelector = (state:PacientesState) => state.pacientes;
export const pacientesErrorSelector = (state:PacientesState) => state.error;
export const pacientesCounterSelector = (state:PacientesState) => state.counter;