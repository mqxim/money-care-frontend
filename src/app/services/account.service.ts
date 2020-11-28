import BaseService from './base.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import Account from '../models/Account';
import TokenService from './token.service';
import Currency from '../models/Currency';

@Injectable({
  providedIn: 'root'
})
export default class AccountService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  public getUserAccounts(): Observable<Account[]> {
    return this.http.post<Account[]>(`${this.baseUrl}/api/account/all`, {}, {
      headers: new HttpHeaders().append('Authorization', `Basic ${TokenService.getToken()}`)
    })
      .pipe(
        map(response => {
          if (!Array.isArray(response)) {
            throw new Error('Invalid response');
          }

          const res = [];
          for (const i of response) {
            if (i == null) {
              continue;
            }

            const accD = i as any;
            const id = accD.hasOwnProperty('id') ? accD.id : null;
            const name = accD.hasOwnProperty('name') ? accD.name : null;
            const currencyId = accD.hasOwnProperty('currencyId') ? accD.currencyId : null;
            const createDate = accD.hasOwnProperty('createDate') ? accD.createDate : null;

            res.push(new Account(id ?? 0, name ?? '', currencyId ?? 0, new Date(createDate)));
          }

          return res;
        }));
  }

  public createAccount(name: string, currencyId: string): Observable<Account> {
    return this.http.post(`${this.baseUrl}/api/account/create`, {
      Name: name,
      CurrencyId: currencyId
    }, {
      headers: new HttpHeaders().append('Authorization', `Basic ${TokenService.getToken()}`)
    })
      .pipe(
        map((response) => {
          const r = response as any;
          const id = r.hasOwnProperty('id') ? r.id : null;
          const accName = r.hasOwnProperty('name') ? r.name : null;
          const accCurrencyId = r.hasOwnProperty('currencyId') ? r.currencyId : null;
          const createDate = r.hasOwnProperty('createDate') ? r.createDate : null;

          if (!(id && accName && accCurrencyId && createDate)) {
            throw new Error('Invalid response');
          }

          return new Account(id, accName, accCurrencyId, createDate);
        })
      );
  }

  public getCurrencies(): Observable<Currency[]> {
    return this.http.post(`${this.baseUrl}/api/currency/all`, {}, {
      headers: new HttpHeaders().append('Authorization', `Basic ${TokenService.getToken()}`)
    })
      .pipe(
        map((response) => {
            if (!Array.isArray(response)) {
              throw new Error('Invalid response');
            }

            const result = [];
            for (const i of response) {
              if (i == null) {
                continue;
              }

              const accD = i as any;
              const id = accD.hasOwnProperty('id') ? accD.id : 0;
              const name = accD.hasOwnProperty('name') ? accD.name : '';
              const code = accD.hasOwnProperty('code') ? accD.code : '';
              const usdRate = accD.hasOwnProperty('usdRate') ? accD.usdRate : 0;

              result.push(new Currency(id, name, code, usdRate));
            }

            return result;
          }
        )
      );
  }

  public deleteAccount(accountId: string): Observable<boolean> {
    return this.http.post(`${this.baseUrl}/api/account/${accountId}/delete`, {}, {
      headers: new HttpHeaders().append('Authorization', `Basic ${TokenService.getToken()}`)
    })
      .pipe(
        map((response) => {
          const r = response as any;
          if (r?.status) {
            if (r.status === 'OK') {
              return true;
            }
          }

          throw new Error('Failed to delete account');
        })
      );
  }

  public renameAccount(accountId: string, newName: string): Observable<Account> {
    return this.http.post(`${this.baseUrl}/api/account/${accountId}/rename`, {
      NewName: newName
    }, {
      headers: new HttpHeaders().append('Authorization', `Basic ${TokenService.getToken()}`)
    })
      .pipe(
        map(response => {
          const r = response as any;
          const id = r.hasOwnProperty('id') ? r.id : null;
          const accName = r.hasOwnProperty('name') ? r.name : null;
          const accCurrencyId = r.hasOwnProperty('currencyId') ? r.currencyId : null;
          const createDate = r.hasOwnProperty('createDate') ? r.createDate : null;

          if (!(id && accName && accCurrencyId && createDate)) {
            throw new Error('Invalid response');
          }

          return new Account(id, accName, accCurrencyId, createDate);
        })
      );
  }
}
