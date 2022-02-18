import {createAction} from '@ngrx/store';

const PREFIX = '[Init] ';

export const AppInitAction = createAction(
  PREFIX + 'AppInit'
);


export const AppDataLoadAction = createAction(
  PREFIX + 'AppDataLoad'
);

