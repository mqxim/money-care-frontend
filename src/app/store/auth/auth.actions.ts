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
  SIGN_OUT = '[Auth] SING_OUT',
  CHANGE_PASSWORD = '[Auth] CHANGE_PASSWORD',
  CHANGE_PASSWORD_SUCCESS = '[Auth] CHANGE_PASSWORD_SUCCESS',
  CHANGE_PASSWORD_FAILURE = '[Auth] CHANGE_PASSWORD_FAILURE',
  CHANGE_USERINFO = '[Auth] CHANGE_USERINFO',
  CHANGE_USERINFO_SUCCESS = '[Auth] CHANGE_USERINFO_SUCCESS',
  CHANGE_USERINFO_FAILURE = '[Auth] CHANGE_USERINFO_FAILURE',
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

export class ChangePasswordAction implements Action {
  readonly type = AuthActionsTypes.CHANGE_PASSWORD;

  constructor(public payload: { oldPassword: string, newPassword: string, newPasswordConfirm: string }) {
  }
}

export class ChangePasswordSuccessAction implements Action {
  readonly type = AuthActionsTypes.CHANGE_PASSWORD_SUCCESS;

  constructor(
    public payload: { password: string }
  ) {
    TokenService.changePassword(payload.password);
  }
}

export class ChangePasswordFailureAction implements Action {
  readonly type = AuthActionsTypes.CHANGE_PASSWORD_FAILURE;

  constructor(public payload: {}) {
  }
}

export class ChangeUserinfoAction implements Action {
  readonly type = AuthActionsTypes.CHANGE_USERINFO;

  constructor(public payload: {
    firstName: string,
    lastName: string
  }) {
  }
}

export class ChangeUserinfoSuccessAction implements Action {
  readonly type = AuthActionsTypes.CHANGE_USERINFO_SUCCESS;

  constructor(public payload: {
    user: User,
  }) {
  }
}

export class ChangeUserinfoFailureAction implements Action {
  readonly type = AuthActionsTypes.CHANGE_USERINFO_FAILURE;

  constructor(public payload: {}) {
  }
}

type AuthAction = TrySignInAction
  | TrySignUpAction
  | SignInSuccessAction
  | SignUpSuccessAction
  | SignInFailureAction
  | SignUpFailureAction
  | SignOutAction
  | ChangePasswordAction
  | ChangePasswordSuccessAction
  | ChangePasswordFailureAction
  | ChangeUserinfoAction
  | ChangeUserinfoSuccessAction
  | ChangeUserinfoFailureAction
  ;

export {
  AuthAction
};
