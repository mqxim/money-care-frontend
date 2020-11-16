import {createFeatureSelector, createSelector} from '@ngrx/store';
import {authNode, AuthState} from './auth.reduces';
import User from '../../models/User';

export const authFeature = createFeatureSelector<AuthState>(authNode);

export const selectIsAuthed = createSelector(
  authFeature,
  (state): boolean => state.isAuthenticated
);

export const selectUser = createSelector(
  authFeature,
  (state): User | null => state.user
);
