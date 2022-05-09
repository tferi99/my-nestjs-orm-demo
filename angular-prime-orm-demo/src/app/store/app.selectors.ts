import { AppState, featureKey } from './app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectGlobalState = createFeatureSelector<AppState>(featureKey);

export const selectLoading = createSelector(
  selectGlobalState,
  global => global.loading
);

