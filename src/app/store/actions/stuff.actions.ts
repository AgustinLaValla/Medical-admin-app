import { createAction, props } from '@ngrx/store';
import { Miembro } from 'src/app/interfaces/miembro.interface';

//GET STUFF ACTIONS
export const loadGetStuff = createAction(
    '[STUFF] Load Get Stuff',
);
export const loadGetStuffSuccess = createAction(
    '[STUFF] Load Get Stuff Success',
    props<{stuff:Miembro[]}>()
);
export const loadGetStuffFailed = createAction(
    '[STUFF] Load Get Stuff Failed',
    props<{error:any}>()
);


//ADD MIEMBRO ACTIONS
export const loadAddMiembro = createAction(
    '[STUFF] Load Add Miembro',
    props<{miembro:Miembro, image?:File}>()
);
export const loadAddMiembroSuccess = createAction(
    '[STUFF] Load Add Miembro Success',
    props<{miembro:Miembro, image:string}>()
);
export const loadAddMiembroFailed = createAction(
    '[STUFF] Load Add Miembro Failed',
    props<{error:any}>()
);

//DELETE MEMBER ACTIONS
export const loadDeleteMiembro = createAction(
    '[STUFF] Load Delete Miembro',
    props<{id: string}>()
);
export const loadDeleteMiembroSuccess = createAction(
    '[STUFF] Load Delete Miembro Success',
    props<{id: string}>()
);
export const loadDeleteMiembroFailed = createAction(
    '[STUFF] Load Delete Miembro Failed',
    props<{error:any}>()
);


