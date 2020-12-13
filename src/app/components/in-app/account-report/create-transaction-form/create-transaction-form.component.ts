import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {AccountReportState} from '../../../../store/account-report/account-report.reducer';
import {selectAccountReport} from '../../../../store/account-report/account-report.selectors';
import {AccountState} from '../../../../store/account/account.reducer';
import {selectCurrencies} from '../../../../store/account/account.selectors';
import Currency from '../../../../models/Currency';
import Category from '../../../../models/Category';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {CreateAccountTransactionAction} from '../../../../store/account-report/account-report.actions';
import Account from '../../../../models/Account';

@Component({
  selector: 'app-create-transaction-form',
  templateUrl: './create-transaction-form.component.html',
  styleUrls: ['./create-transaction-form.component.scss']
})
export class CreateTransactionFormComponent implements OnInit {
  @Output() whenClose = new EventEmitter();
  @Output() whenSubmit = new EventEmitter();

  form = new FormGroup({
    category: new FormControl(null, []),
    cost: new FormControl(null, [Validators.required, Validators.min(0)]),
    comment: new FormControl(null, []),
    isExpense: new FormControl(true),
  });

  currency: Currency | null;
  accountCurrency: Currency | null;
  account: Account | null;
  currencies: Currency[];
  categories: Category[];

  selectable = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedCategories: string[] = [];

  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private accountReportStore$: Store<AccountReportState>,
    private accountsStore$: Store<AccountState>,
  ) {
    this.categories = Category.getAll();

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

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedCategories = [];
    this.selectedCategories.push(event.option.viewValue);
    this.categoryInput.nativeElement.value = '';

    this.form.controls.category.setValue(event.option.viewValue);
  }

  remove(f: string): void {
    const index = this.selectedCategories.indexOf(f);
    if (index >= 0) {
      this.selectedCategories.splice(index, 1);
    }

    this.selectedCategories = [];
    this.form.controls.category.setValue(null);
  }

  addCategory(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.selectedCategories = [];
      this.selectedCategories.push(value.trim());
      this.form.controls.category.setValue(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  onClose(): void {
    this.whenClose.emit();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const result = {
        category: '',
        cost: 0,
        comment: '',
      };

      if (this.form.controls.category.value) {
        result.category = this.form.controls.category.value;
      }

      if (this.form.controls.cost.value) {
        result.cost = this.form.controls.isExpense.value ? (this.form.controls.cost.value * -1) : this.form.controls.cost.value;
        if (this.currency.id !== this.accountCurrency.id) {
          result.cost = result.cost * this.currency.usdRate / this.accountCurrency.usdRate;
        }
      }

      if (this.form.controls.comment.value) {
        result.comment = this.form.controls.comment.value;
      }

      this.accountReportStore$.dispatch(new CreateAccountTransactionAction({
        accountId: this.account.id,
        category: result.category,
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
