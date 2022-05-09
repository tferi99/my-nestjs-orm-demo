import { createAction, props } from '@ngrx/store';

const PREFIX = '[App] ';

export const LoadingAction = createAction(
  PREFIX + 'Loading'
);

