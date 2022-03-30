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

export const AuthInitilizedAction = createAction(
  PREFIX + 'AuthInitilized',
  props<{
    auth: AuthWithExpiration,
    navigateTarget?: string     // navigate here in (default is '')
  }>()
);

export const LogoutAction = createAction(
  PREFIX + 'Logout',
);

export const RenewAction = createAction(
  PREFIX + 'Renew',
);

export const RenewSuccessAction = createAction(
  PREFIX + 'RenewSuccess',
  props<{
    auth: AuthWithExpiration,
    navigateTarget?: string     // navigate here in (default is '')
  }>()
);

export const RenewErrorAction = createAction(
  PREFIX + 'RenewError',
  props<{errorMessage: string}>()
);

