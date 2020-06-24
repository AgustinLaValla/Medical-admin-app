import { Action, createReducer, on } from '@ngrx/store';
import { showCalendar, hideCalendar } from '../actions';

export interface CalendarState {
    show: boolean;
};

const initialState: CalendarState = {
    show: false
};

const reducer = createReducer(
    initialState,
    on(showCalendar, (state) => {
        return {
            show: true
        };
    }),
    on(hideCalendar, (state) => {
        return {
            show: false
        }
    })
);

export function calendarReducer(state: CalendarState | undefined, action: Action): CalendarState {
    return reducer(state, action);
};