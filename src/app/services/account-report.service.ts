import BaseService from './base.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import TokenService from './token.service';
import {map} from 'rxjs/operators';
import Transaction from '../models/Transaction';
import AccountReport from '../models/AccountReport';
import {Injectable} from '@angular/core';
import Account from '../models/Account';
import Currency from '../models/Currency';

@Injectable({
  providedIn: 'root'
})
export default class AccountReportService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  public getAccountReport(
    accountReportQuery: {
      accountId: string,
      startDate: string,
      endDate: string
    }
  ): Observable<AccountReport> {
    return this.http.post<AccountReport>(`${this.baseUrl}/api/account/${accountReportQuery.accountId}/report`, {
      StartDate: accountReportQuery.startDate,
      EndDate: accountReportQuery.endDate
    }, {
      headers: new HttpHeaders().append('Authorization', `Basic ${TokenService.getToken()}`)
    })
      .pipe(
        map(response => {
            const accountReport = response as any;

            const startDate = accountReport.hasOwnProperty('startDate') ? new Date(accountReport.startDate) : null;
            const endDate = accountReport.hasOwnProperty('endDate') ? new Date(accountReport.endDate) : null;
            const currentBalance = accountReport.hasOwnProperty('currentBalance') ? accountReport.currentBalance : 0;
            const incomes = accountReport.hasOwnProperty('incomes') ? accountReport.incomes : 0;
            const expenses = accountReport.hasOwnProperty('expenses') ? accountReport.expenses : 0;
            const periodBalance = accountReport.hasOwnProperty('periodBalance') ? accountReport.periodBalance : 0;

            const transactions = [];
            for (const v of accountReport.transactions) {
              transactions.push(new Transaction(
                  v.transactionId,
                  v.accountId,
                  v.category,
                  v.cost,
                  v.comment,
                  new Date(v.createDate)
                )
              );
            }

            return new AccountReport(
              startDate,
              endDate,
              transactions,
              currentBalance,
              incomes,
              expenses,
              periodBalance,
              new Account(
                accountReport.account.id,
                accountReport.account.name,
                accountReport.account.currencyId,
                new Date(accountReport.account.createDate)
              ),
              new Currency(
                accountReport.currency.id,
                accountReport.currency.name,
                accountReport.currency.code,
                accountReport.currency.usdRate,
              )
            );
          }
        )
      );
  }
}
