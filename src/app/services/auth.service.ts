import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import User from '../models/User';
import BaseService from './base.service';
import {first, last, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import TokenService from './token.service';

@Injectable({
  providedIn: 'root'
})
class AuthServices extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  public trySignIn(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/api/authorize/sign-in`, {
      Email: email,
      Password: password
    })
      .pipe(
        map(response => {
          if (!('id' in response && 'firstName' in response && 'lastName' in response)) {
            throw new Error('Response does not contains valid data');
          }
          return new User(
            response.id,
            response.firstName,
            response.lastName
          );
        })
      );
  }

  public trySignUp(
    {
      firstName, lastName, email, password
    }
  ): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/api/authorize/sign-up`, {
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Password: password
    })
      .pipe(
        map(response => {
          if (!('id' in response && 'firstName' in response && 'lastName' in response)) {
            throw new Error('Response does not contains valid data');
          }

          return new User(
            response.id,
            response.firstName,
            response.lastName
          );
        })
      );
  }

  public changePassword({oldPassword, newPassword, passwordConfirm}): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/api/authorize/update-password`, {
      OldPassword: oldPassword,
      NewPassword: newPassword,
      NewPasswordConfirm: passwordConfirm,
    }, {
      headers: new HttpHeaders().append('Authorization', `Basic ${TokenService.getToken()}`)
    })
      .pipe(
        map(response => {
          if (!('id' in response && 'firstName' in response && 'lastName' in response)) {
            throw new Error('Response does not contains valid data');
          }

          return new User(
            response.id,
            response.firstName,
            response.lastName
          );
        })
      );
  }

  public changeUserInfo({firstName, lastName}): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/api/authorize/update-user-info`, {
      FirstName: firstName,
      LastName: lastName,
    }, {
      headers: new HttpHeaders().append('Authorization', `Basic ${TokenService.getToken()}`)
    })
      .pipe(
        map(response => {
          if (!('id' in response && 'firstName' in response && 'lastName' in response)) {
            throw new Error('Response does not contains valid data');
          }

          return new User(
            response.id,
            response.firstName,
            response.lastName
          );
        })
      );
  }
}

export {
  AuthServices
};
