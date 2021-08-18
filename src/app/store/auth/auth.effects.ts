import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  AuthActionsTypes,
  ChangePasswordAction,
  ChangePasswordFailureAction,
  ChangePasswordSuccessAction,
  ChangeUserinfoAction,
  ChangeUserinfoFailureAction,
  ChangeUserinfoSuccessAction,
  SignInFailureAction,
  SignInSuccessAction,
  SignOutAction,
  SignUpFailureAction,
  SignUpSuccessAction,
  TrySignInAction,
  TrySignUpAction
} from './auth.actions';
import { exhaustMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthServices } from './auth.service';
import { fromPromise } from 'rxjs/internal-compatibility';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthServices) {
  }

  @Effect()
  signIn(): Observable<any> {
    return this.actions$.pipe(
      ofType<TrySignInAction>(AuthActionsTypes.TRY_SIGN_IN),
      exhaustMap((action) =>
        fromPromise(new Promise(async (resolve) => {
          try {
            const user = await this.authService.trySignIn(action.payload.email, action.payload.password);

            resolve(new SignInSuccessAction({
                user, email: action.payload.email, password: action.payload.password
              }
            ));
          } catch (e) {
            resolve(new SignInFailureAction({ reason: e.message }));
          }
        }))
      ));
  }

  @Effect()
  singUp(): Observable<any> {
    return this.actions$.pipe(
      ofType<TrySignUpAction>(AuthActionsTypes.TRY_SIGN_UP),
      exhaustMap((action) => {
          return fromPromise(new Promise(async (resolve) => {
            try {
              const user = await this.authService.trySignUp({
                email: action.payload.email,
                password: action.payload.password,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName
              });

              resolve(new SignUpSuccessAction({
                  user, email: action.payload.email, password: action.payload.password
                }
              ));
            } catch (e) {
              resolve(new SignUpFailureAction({ reason: e.message }));
            }
          }));
        }
      ));
  }

  @Effect()
  changePassword(): Observable<any> {
    return this.actions$.pipe(
      ofType<ChangePasswordAction>(AuthActionsTypes.CHANGE_PASSWORD),
      exhaustMap((action) => {
        return fromPromise(new Promise(async (resolve) => {
          try {
            if (action.payload.newPassword !== action.payload.newPasswordConfirm) {
              resolve(new ChangePasswordFailureAction({}));
              return;
            }

            await this.authService.changePassword({
              oldPassword: action.payload.oldPassword,
              password: action.payload.newPassword,
            });

            resolve(new ChangePasswordSuccessAction({ password: action.payload.newPassword }));
          } catch (e) {
            resolve(new ChangePasswordFailureAction({}));
          }
        }));
      })
    );
  }

  @Effect()
  changeUserInfo(): Observable<any> {
    return this.actions$.pipe(
      ofType<ChangeUserinfoAction>(AuthActionsTypes.CHANGE_USERINFO),
      exhaustMap((action) => {
        return fromPromise(new Promise(async (resolve) => {
          try {
            const user = await this.authService.changeUserInfo({
              firstName: action.payload.firstName,
              lastName: action.payload.lastName,
            });

            resolve(new ChangeUserinfoSuccessAction({ user }));
          } catch (e) {
            resolve(new ChangeUserinfoFailureAction({}));
          }
        }));
      })
    );
  }

  @Effect()
  logout(): Observable<any> {
    return this.actions$.pipe(
      ofType<SignOutAction>(AuthActionsTypes.SIGN_OUT),
      exhaustMap(() => {
        return fromPromise(new Promise(() => {
          this.authService.logout();
        }));
      })
    );
  }
}

