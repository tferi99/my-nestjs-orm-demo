import {AuthState, featureKey} from './auth.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Role} from '@app/client-lib';

export const selectAuthState = createFeatureSelector<AuthState>(featureKey);

export const selectAuthentication = createSelector(
  selectAuthState,
  auth => auth.currentAuth
);

export const selectIsAuthenticated = createSelector(
  selectAuthentication,
  authentication => authentication != undefined && authentication != null
);

export const selectIsAdmin = createSelector(
  selectAuthentication,
  authentication => authentication?.roles.includes(Role.Admin)
);

