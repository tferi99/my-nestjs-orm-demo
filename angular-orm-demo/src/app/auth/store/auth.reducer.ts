import {AuthInitilizedAction, LoginSuccessAction, LogoutAction, RenewSuccessAction} from './auth.actions';
import {Action, createReducer, on} from '@ngrx/store';
import {AuthWithExpiration} from '../model/auth-with-expiration';

export const featureKey = 'auth';

export interface AuthState {
  currentAuth?: AuthWithExpiration;
}

export const initialState: AuthState = {
  currentAuth: undefined,
};

const authReducer = createReducer(
  initialState,
  on(LoginSuccessAction, (state: AuthState, {auth}) => ({...state, currentAuth: auth})),
  on(AuthInitilizedAction, (state: AuthState, {auth}) => ({...state, currentAuth: auth})),
  on(LogoutAction, (state: AuthState) => (initialState)),
  on(RenewSuccessAction, (state: AuthState, {auth}) => ({...state, currentAuth: auth})),
);

export function reducer(state: AuthState | undefined, action: Action): AuthState {
  return authReducer(state, action);
}
