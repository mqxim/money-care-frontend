import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AccountReportState } from '../../../../store/account-report/account-report.reducer';
import { selectAccountReport } from '../../../../store/account-report/account-report.selectors';
import { AccountState } from '../../../../store/account/account.reducer';
import { selectCategories, selectCurrencies } from '../../../../store/account/account.selectors';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { CreateAccountTransactionAction } from '../../../../store/account-report/account-report.actions';
import { Account, Category, Currency } from '../../../../store/model';

@Component({
  selector: 'app-create-transaction-form',
  templateUrl: './create-transaction-form.component.html',
  styleUrls: [ './create-transaction-form.component.scss' ]
})
export class CreateTransactionFormComponent implements OnInit {
  @Output() whenClose = new EventEmitter();

  @Output() whenSubmit = new EventEmitter();

  form = new FormGroup({
    category: new FormControl(null, [ Validators.required ]),
    cost: new FormControl(null, [ Validators.required, Validators.min(0) ]),
    comment: new FormControl(null, []),
    isExpense: new FormControl(true),
  });

  currency: Currency | null;

  accountCurrency: Currency | null;

  account: Account | null;

  currencies: Currency[];

  categories: Category[];

  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;

  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private accountReportStore$: Store<AccountReportState>,
    private accountsStore$: Store<AccountState>,
  ) {
    this.accountsStore$
      .pipe(select(selectCategories))
      .subscribe((c) => this.categories = c)
    ;

    this.accountReportStore$
      .pipe(select(selectAccountReport))
      .subscribe((c) => {
        this.currency = c.currency;
        this.accountCurrency = c.currency;
      });

    this.accountReportStore$
      .pipe(select(selectAccountReport))
      .subscribe((c) => {
        this.account = c.account;
      });

    this.accountsStore$
      .pipe(select(selectCurrencies))
      .subscribe((c) => this.currencies = c);
  }

  ngOnInit(): void {
  }

  onClose(): void {
    this.whenClose.emit();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const result = {
        category: this.form.controls.category.value ?? 0,
        cost: 0,
        comment: this.form.controls.comment.value ?? '',
      };

      if (this.form.controls.cost.value) {
        result.cost = this.form.controls.isExpense.value ? (this.form.controls.cost.value * -1) : this.form.controls.cost.value;
        if (this.currency.id !== this.accountCurrency.id) {
          result.cost = result.cost * this.currency.usdRate / this.accountCurrency.usdRate;
        }
      }

      this.accountReportStore$.dispatch(new CreateAccountTransactionAction({
        accountId: this.account.id,
        categoryId: result.category,
        cost: result.cost,
        comment: result.comment,
        dateTime: new Date().toISOString()
      }));

      setTimeout(() => {
        this.whenSubmit.emit();
      }, 0.5);
    }
  }
}
