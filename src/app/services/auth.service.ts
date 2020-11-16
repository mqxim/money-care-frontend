import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import User from '../models/User';
import BaseService from './base.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

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

          return {
            id: response.id,
            firstName: response.firstName,
            lastName: response.lastName
          };
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

          return {
            id: response.id,
            firstName: response.firstName,
            lastName: response.lastName
          };
        })
      );
  }
}

export {
  AuthServices
};
