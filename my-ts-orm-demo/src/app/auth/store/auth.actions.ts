import {createAction, props} from '@ngrx/store';
import {AuthWithExpiration} from '../model/auth-with-expiration';

const PREFIX = '[Auth] ';

export const LoginAction = createAction(
  PREFIX + 'Login',
  props<{username: string, password: string}>()
);

export const LoginSuccessAction = createAction(
  PREFIX + 'LoginSuccess',
  props<{
    auth: AuthWithExpiration,
    navigateTarget?: string     // navigate here in (default is '')
  }>()
);

export const LoginErrorAction = createAction(
  PREFIX + 'LoginError',
  props<{errorMessage: string}>()
);

export const AuthValidatedAction = createAction(
  PREFIX + 'AuthValidated',
  props<{
    auth: AuthWithExpiration,
    navigateTarget?: string     // navigate here in (default is '')
  }>()
);

export const LogoutAction = createAction(
  PREFIX + 'Logout',
);

/*
export const AuthRoleTestAction = createAction(
  PREFIX + 'AuthRoleTest',
  props<{
    role: Role,
    onOkActions?: Action[],     // if empty or undefined default action will be fired: AuthRoleTestOkAction
    onErrorActions?: Action[],  // if empty or undefined default action will be fired: AuthTestErrorAction
    navigateTarget?: string     // navigate here in LoginSuccessAction (default is '')
  }>()
);


export const AuthRoleTestOkAction = createAction(
  PREFIX + 'AuthRoleTestOk',
  props<{role: Role}>()
);

export const AuthRoleTestErrorAction = createAction(
  PREFIX + 'AuthRoleTestError',
  props<{role: Role, message: string}>()
);

export const AuthTest1Action = createAction(
  PREFIX + 'AuthTest1'
);

export const AuthTest2Action = createAction(
  PREFIX + 'AuthTest2'
);

export const AuthTest3Action = createAction(
  PREFIX + 'AuthTest3'
);

export const DummyAction = createAction(
  PREFIX + 'DUMMY'
);*/

