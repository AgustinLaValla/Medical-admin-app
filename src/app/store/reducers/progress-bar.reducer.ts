import { Action, createReducer, on } from '@ngrx/store';
import { showProgressBar, hiddeProgressBar } from '../actions';

export interface ProgressBarState {
    show: boolean;
};

const initialState: ProgressBarState = {
    show: false
};

const reducer = createReducer(
    initialState,
    on(showProgressBar, () => {
        return {
            show: true
        };
    }),
    on(hiddeProgressBar, () => {
        return {
            show: false
        }
    })
);

export function progressBarReducer(state: ProgressBarState | undefined, action: Action): ProgressBarState {
    return reducer(state, action);
};