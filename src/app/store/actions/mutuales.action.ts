import { createAction, props } from "@ngrx/store";
import { Mutual } from 'src/app/interfaces/mutual.interface';

export const loadGetMutuales = createAction(
    '[MUTUALES] Load Get Mutuales'
);
export const loadGetMutualesSuccess = createAction(
    '[MUTUALES] Load Get Mutuales Success',
    props<{mutuales:Mutual[]}>()
);

export const loadGetMutualesFailed = createAction(
    '[MUTUALES] Load Get Mutuales Failed',
    props<{error:any}>()
);

//Add Mutual Action
export const loadAddMutual = createAction(
    '[MUTUALES] Load Add Mutual',
     props<{mutual:Mutual}>()
);

export const loadAddMutualSuccess = createAction(
    '[MUTUALES] Load Add Mutual Success',
     props<{mutual:Mutual, mutualId:string}>()
);

export const loadAddMutualFailed = createAction(
    '[MUTUALES] Load Add Mutual Failed',
     props<{error:any}>()
);

//Update Mutual Action
export const loadUpdateMutual = createAction(
    '[MUTUALES] Load Update Mutual',
     props<{mutual:Mutual}>()
);

export const loadUpdateMutualSuccess = createAction(
    '[MUTUALES] Load Update Mutual Success',
     props<{mutual:Mutual}>()
);

export const loadUpdateMutualFailed = createAction(
    '[MUTUALES] Load Update Mutual Failed',
     props<{error:any}>()
);

//Delete Mutual Action
export const loadDeleteMutual = createAction(
    '[MUTUALES] Load Delete Mutual',
     props<{mutualId:string}>()
);

export const loadDeleteMutualSuccess = createAction(
    '[MUTUALES] Load Delete Mutual Success',
     props<{mutualId:string}>()
);

export const loadDeleteMutualFailed = createAction(
    '[MUTUALES] Load Delete Mutual Failed',
     props<{error:any}>()
);