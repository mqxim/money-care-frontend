import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authNode, AuthState } from './auth.reducer';
import { User } from '../model';

const authFeatureSelector = createFeatureSelector<AuthState>(authNode);

export const selectIsAuthed = createSelector(
  authFeatureSelector,
  (state): boolean => state.isAuthenticated
);

export const selectUser = createSelector(
  authFeatureSelector,
  (state): User | null => state.user
);
