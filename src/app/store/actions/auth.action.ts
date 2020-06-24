import { createAction } from '@ngrx/store';

export const setAuthenticated = createAction(
    '[Auth] Set Authenticated',
);

export const setUnAuthenticated = createAction(
    '[Auth] Set Unauthenticated'
);
