import * as fromUI from '../actions/ui.action';
import { createReducer, Action, on } from '@ngrx/store';

export interface UI_State { 
    loading: boolean,
    unsubscribeLoding: boolean
}
const initialState: UI_State = {
    loading: false,
    unsubscribeLoding: false
}

const reducer = createReducer(
    initialState,
    on(fromUI.activateLoading, (state) => {
        return {
            ...state,
            loading:true
        }
    }),
    on(fromUI.deactivateLoading, (state) => {
        return {
            ...state,
            loading: false
        }
    }),
    on(fromUI.unsubscribeLoading, (state) => {
        return {
            ...state,
            unsubscribeLoding:true
        }
    }),
    on(fromUI.subscribeLoading, (state) => {
        return {
            ...state,
            unsubscribeLoding: false
        }
    })
)

export function uiReducer(state:UI_State , action: Action): UI_State {
    return reducer(state, action);
 }

export const getIsLoadingSelector = (state:UI_State) => state.loading;
export const getUnsubscribeLoadingSelector = (state:UI_State) => state.unsubscribeLoding;