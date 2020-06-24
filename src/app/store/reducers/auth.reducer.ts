import { createReducer, Action, on } from '@ngrx/store';
import * as fromAUTH from '../actions/auth.action';

export interface AuthState {
    isAuthenticated: boolean
};

const initialState: AuthState = {
    isAuthenticated: false
};

const reducer = createReducer(
    initialState,
    on(fromAUTH.setAuthenticated, (state) => {
        return {
            ...state,
            isAuthenticated: true
        };
    }),
    on(fromAUTH.setUnAuthenticated, (state) => {
        return {
            ...state,
            isAuthenticated: false
        };
    })
)

export function authReducer(state: AuthState, action: Action): AuthState {
    return reducer(state, action);
}

export const getIsAuthSelector = (state: AuthState) => state.isAuthenticated; 