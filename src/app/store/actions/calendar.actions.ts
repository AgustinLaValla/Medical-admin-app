import { createAction } from '@ngrx/store';

export const showCalendar = createAction(
    '[CALENDAR] Show Calendar'
);

export const hideCalendar = createAction(
    '[CALENDAR] Hide Calendar'
);