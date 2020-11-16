import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  AuthActionsTypes,
  SignInFailureAction,
  SignInSuccessAction, SignUpFailureAction,
  SignUpSuccessAction,
  TrySignInAction,
  TrySignUpAction
} from './auth.actions';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {AuthServices} from '../../services/auth.service';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthServices) {
  }

  @Effect()
  signIn(): Observable<any> {
    return this.actions$.pipe(
      ofType<TrySignInAction>(AuthActionsTypes.TRY_SIGN_IN),
      exhaustMap((action) =>
        this.authService.trySignIn(action.payload.email, action.payload.password)
          .pipe(
            map(response => {
              return new SignInSuccessAction({user: response, email: action.payload.email, password: action.payload.password});
            }),
            catchError((err) => {
              const error = err as HttpErrorResponse;
              const response = {reason: ''};
              switch (error.status) {
                case 404:
                  response.reason = 'User not found';
                  break;
                case 401:
                  response.reason = 'Wrong password';
                  break;
                default:
                  response.reason = 'Server error';
                  break;
              }
              return of(new SignInFailureAction({reason: response.reason}));
            })
          )
      ));
  }

  @Effect()
  singUp(): Observable<any> {
    return this.actions$.pipe(
      ofType<TrySignUpAction>(AuthActionsTypes.TRY_SIGN_UP),
      exhaustMap((action) =>
        this.authService.trySignUp({
          email: action.payload.email,
          password: action.payload.password,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName
        })
          .pipe(
            map(response => {
              return new SignUpSuccessAction({user: response, email: action.payload.email, password: action.payload.password});
            }),
            catchError((err) => {
              const error = err as HttpErrorResponse;
              const response = {reason: ''};
              switch (error.status) {
                case 400:
                  response.reason = 'Bad request';
                  break;
                default:
                  response.reason = 'Server error';
                  break;
              }
              return of(new SignUpFailureAction({reason: response.reason}));
            })
          )
      ));
  }
}
