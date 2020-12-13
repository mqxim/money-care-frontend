import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {AccountReportState} from '../../../../store/account-report/account-report.reducer';
import {selectAccountReport} from '../../../../store/account-report/account-report.selectors';
import {AccountState} from '../../../../store/account/account.reducer';
import {selectCurrencies} from '../../../../store/account/account.selectors';
import Currency from '../../../../models/Currency';

@Component({
  selector: 'app-create-transaction-form',
  templateUrl: './create-transaction-form.component.html',
  styleUrls: ['./create-transaction-form.component.scss']
})
export class CreateTransactionFormComponent implements OnInit {
  form = new FormGroup({
    category: new FormControl(null, []),
    cost: new FormControl(null, Validators.min(0)),
    comment: new FormControl(null),
    isExpense: new FormControl(true),
  });

  currency: Currency|null;
  currencies: Currency[];

  constructor(
    private accountReportStore$: Store<AccountReportState>,
    private accountsStore$: Store<AccountState>,
  ) {
    this.accountReportStore$
      .pipe(select(selectAccountReport))
      .subscribe((c) => this.currency = c.currency);

    this.accountsStore$
      .pipe(select(selectCurrencies))
      .subscribe((c) => this.currencies = c);
  }

  ngOnInit(): void {
  }

  onClose(): void {
  }

  onSubmit(): void {
  }
}
