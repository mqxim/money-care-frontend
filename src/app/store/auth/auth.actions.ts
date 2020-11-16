import {Action} from '@ngrx/store';
import User from '../../models/User';
import TokenService from '../../services/token.service';

export enum AuthActionsTypes {
  TRY_SIGN_IN = '[Auth] TRY_SIGN_IN',
  SIGN_IN_SUCCESS = '[Auth] SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE = '[Auth] SIGN_IN_FAILURE',
  TRY_SIGN_UP = '[Auth] TRY_SIGN_UP',
  SIGN_UP_SUCCESS = '[Auth] SIGN_UP_SUCCESS',
  SIGN_UP_FAILURE = '[Auth] SIGN_UP_FAILURE',
  SIGN_OUT = '[Auth] SING_OUT'
}

export class TrySignInAction implements Action {
  readonly type = AuthActionsTypes.TRY_SIGN_IN;

  constructor(public payload: {
    email: string,
    password: string
  }) {
  }
}

export class SignInSuccessAction implements Action {
  readonly type = AuthActionsTypes.SIGN_IN_SUCCESS;

  constructor(public payload: { user: User, email: string, password: string, }) {
    TokenService.saveToken(payload.email, payload.password);
  }
}

export class SignInFailureAction implements Action {
  readonly type = AuthActionsTypes.SIGN_IN_FAILURE;

  constructor(public payload: {
    reason: string,
  }) {
  }
}

export class TrySignUpAction implements Action {
  readonly type = AuthActionsTypes.TRY_SIGN_UP;

  constructor(public payload: {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  }) {
  }
}

export class SignUpSuccessAction implements Action {
  readonly type = AuthActionsTypes.SIGN_UP_SUCCESS;

  constructor(public payload: { user: User, email: string, password: string, }) {
    TokenService.saveToken(payload.email, payload.password);
  }
}

export class SignUpFailureAction implements Action {
  readonly type = AuthActionsTypes.SIGN_UP_FAILURE;

  constructor(public payload: {
    reason: string,
  }) {
  }
}

export class SignOutAction implements Action {
  readonly type = AuthActionsTypes.SIGN_OUT;

  constructor() {
    TokenService.deleteToken();
  }
}

type AuthAction = TrySignInAction
  | TrySignUpAction
  | SignInSuccessAction
  | SignUpSuccessAction
  | SignInFailureAction
  | SignUpFailureAction
  | SignOutAction
  ;

export {
  AuthAction
};
