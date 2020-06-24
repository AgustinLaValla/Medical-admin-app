import { createAction, props } from '@ngrx/store';


export const loadShowStatistics = createAction(
    '[Statistics] Load Show Statistics',
    props<{especialistaId:string}>()
);

export const loadHiddeStatistics = createAction(
    '[Statistics] Load Hidde Statistics'
);