import { createAction } from '@ngrx/store';

export const showProgressBar = createAction(
    '[PROGRESS_BAR] Show Progress Bar'
);

export const hiddeProgressBar = createAction(
    '[PROGRESS_BAR] Hide Progress Bar'
);