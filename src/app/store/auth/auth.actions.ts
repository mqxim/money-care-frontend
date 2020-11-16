import {Action} from '@ngrx/store';
import User from '../../models/User';

export enum AuthActionsTypes {
  TRY_SIGN_IN = '[Auth] TRY_SIGN_IN',
  SIGN_IN_SUCCESS = '[Auth] SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE = '[Auth] SIGN_IN_FAILURE',
  TRY_SIGN_UP = '[Auth] TRY_SIGN_UP',
  SIGN_UP_SUCCESS = '[Auth] SIGN_UP_SUCCESS',
  SIGN_UP_FAILURE = '[Auth] SIGN_UP_FAILURE',
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

  constructor(public payload: {
    user: User,
  }) {
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

  constructor(public payload: { user: User, }) {
  }
}

export class SignUpFailureAction implements Action {
  readonly type = AuthActionsTypes.SIGN_UP_FAILURE;

  constructor(public payload: {
    reason: string,
  }) {
  }
}

type AuthAction = TrySignInAction
  | TrySignUpAction
  | SignInSuccessAction
  | SignUpSuccessAction
  | SignInFailureAction
  | SignUpFailureAction;

export {
  AuthAction
};
