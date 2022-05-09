import { LoginErrorAction, LoginSuccessAction, LogoutAction } from '../auth/store/auth.actions';
import { createReducer, on } from '@ngrx/store';
import { LoadingAction } from './app.actions';

export const featureKey = 'app';


export interface AppState {
  loading: boolean
}

export const initialState: AppState = {
  loading: false
};

export const appReducer = createReducer(
  initialState,
  on(LogoutAction, (state: AppState) => (initialState)),
  on(LoadingAction, (state: AppState) => ({...state, loading: true})),
  on(LoginSuccessAction, (state: AppState) => ({...state, loading: false})),
  on(LoginErrorAction, (state: AppState) => ({...state, loading: false})),
);
