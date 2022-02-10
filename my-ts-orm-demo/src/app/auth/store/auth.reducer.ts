import {LoginSuccessAction, LogoutAction} from './auth.actions';
import {Action, createReducer, on, State} from '@ngrx/store';
import {Auth} from '@app/client-lib';

export const featureKey = 'auth';

export interface AuthState {
  currentAuth?: Auth;
}

export const initialState: AuthState = {
  currentAuth: undefined,
};

const authReducer = createReducer(
  initialState,
  on(LogoutAction, (state: AuthState) => (initialState)),
  on(LoginSuccessAction, (state: AuthState, {auth}) => ({...state, currentAuth: auth})),
);

export function reducer(state: AuthState | undefined, action: Action): AuthState {
  return authReducer(state, action);
}
