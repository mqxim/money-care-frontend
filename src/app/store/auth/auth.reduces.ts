import User from '../../models/User';
import {AuthAction, AuthActionsTypes} from './auth.actions';

export const authNode = 'authNode';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null
};

export function authReducer(state = initialState, action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActionsTypes.SIGN_UP_SUCCESS: {
      return {
        isAuthenticated: true,
        user: action.payload.user,
      };
    }
    case AuthActionsTypes.SIGN_UP_FAILURE: {
      return {
        isAuthenticated: false,
        user: null
      };
    }
    case AuthActionsTypes.SIGN_IN_SUCCESS: {
      return {
        isAuthenticated: true,
        user: action.payload.user,
      };
    }
    case AuthActionsTypes.SIGN_IN_FAILURE: {
      return {
        isAuthenticated: false,
        user: null
      };
    }
    default: {
      return state;
    }
  }
}
