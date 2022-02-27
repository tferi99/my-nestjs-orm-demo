import {AuthState} from '../auth/store/auth.reducer';
import {LogoutAction} from '../auth/store/auth.actions';
import {createReducer, on} from '@ngrx/store';

export interface AppState {}

export const initialState: AppState = {};

export const appReducer = createReducer(
  initialState,
  on(LogoutAction, (state: AppState) => (initialState)),
);
