import { loadCloseDialog } from '../actions/dialog.action';
import { createReducer, on } from '@ngrx/store';
import { Action } from '@ngrx/store';

export interface DialogState {
    close: boolean;
};

const initialState: DialogState = {
    close:false
};

const reducer = createReducer(
    initialState,
    on(loadCloseDialog, (state, action) => {
        return { 
            close: action.close
        };
    })
);

export function dialogReducer(state: DialogState | undefined, action: Action): DialogState { 
    return reducer(state, action);
}
