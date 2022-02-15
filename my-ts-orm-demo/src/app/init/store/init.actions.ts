import {createAction} from '@ngrx/store';

const PREFIX = '[Init] ';

export const AppDataLoadAction = createAction(
  PREFIX + 'AppDataLoad'
);

