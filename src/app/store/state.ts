import {ActionReducerMap} from '@ngrx/store';
import {authReducer, AuthState} from './auth/auth.reduces';

interface AppState {
  authState: AuthState;
}

const reducers: ActionReducerMap<AppState> = {
  authState: authReducer
};

export {
  AppState,
  reducers
};

