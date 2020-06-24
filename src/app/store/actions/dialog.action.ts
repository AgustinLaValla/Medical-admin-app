import { createAction, props } from "@ngrx/store";


export const loadCloseDialog = createAction(
    '[DIALOG] Load Close Dialog',
    props<{close:boolean}>()
);