import { Action, createAction, props } from '@ngrx/store';

//OPEN AND CLOSE TABLE
export const loadOpenTable = createAction(
    '[TABLE] Load Open Table',
    props<{ especialistaId:string, tableType:'Especialistas' | 'Turnos Pasados',counter:number}>()
);
export const loadCloseTable = createAction(
    '[TABLE] Load Close Table',
);
export const loadIncrementCounter = createAction(
    '[TABLE] Load Increment Counter',
    props<{value:number}>()
);

