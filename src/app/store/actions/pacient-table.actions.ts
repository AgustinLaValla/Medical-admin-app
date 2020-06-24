import { createAction, props } from '@ngrx/store';

export const openPacientTable = createAction(
    '[PACIENT_TABLE] Open Pacient Table'
);
export const closePacientTable = createAction(
    '[PACIENT_TABLE] Close Pacient Table'
);
