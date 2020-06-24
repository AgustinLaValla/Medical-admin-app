import { Action, createReducer, on } from '@ngrx/store';
import { loadShowStatistics, loadHiddeStatistics } from '../actions';

export interface StatisticsState {
    show:boolean;
    especialistaId:string;
};

const initialState: StatisticsState = {
    show:false,
    especialistaId:null
};

const reducer = createReducer(
    initialState,
    on(loadShowStatistics, (state, action) => {
        return {
            show:true,
            especialistaId: action.especialistaId
        }
    }),
    on(loadHiddeStatistics, (state, action) => {
        return {
            show:false,
            especialistaId:null
        }
    })
);

export function statisticsReducer(state:StatisticsState | undefined, action:Action):StatisticsState { 
    return reducer(state, action);
};