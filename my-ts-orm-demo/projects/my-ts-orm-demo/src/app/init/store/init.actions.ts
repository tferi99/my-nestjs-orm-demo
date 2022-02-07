import {createAction} from '@ngrx/store';

const PREFIX = '[Init] ';

export const InitLoadAction = createAction(
  PREFIX + 'Load'
);

