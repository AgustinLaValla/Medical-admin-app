import { createAction, props } from "@ngrx/store";

export const ShowTurnosData = createAction(
    '[Turnos Data] Show Turnos Data',
    props<{especialistaId:string}>()
);

export  const HideTurnosData = createAction(
    '[Turnos Data] Hide Turnos Data',
);