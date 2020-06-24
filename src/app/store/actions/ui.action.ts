import { createAction } from '@ngrx/store';

export const activateLoading = createAction(
    '[UI] Activate Loading'
);

export const deactivateLoading = createAction(
    '[UI] Deactivate Loading'
);

export const subscribeLoading = createAction(
    '[UI] subscribe Loading'
);

export const unsubscribeLoading = createAction(
    '[UI] Unsubscribe Loading'
);