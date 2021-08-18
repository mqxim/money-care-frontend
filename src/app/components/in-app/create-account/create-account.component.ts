import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Currency } from '../../../store/model';
import { select, Store } from '@ngrx/store';
import { AccountState } from '../../../store/account/account.reducer';
import { selectCurrencies } from '../../../store/account/account.selectors';
import { CreateAccountAction } from '../../../store/account/account.actions';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: [ './create-account.component.scss' ]
})
export class CreateAccountComponent implements OnInit {
  @Output() whenClose = new EventEmitter();
  @Output() whenFillForm = new EventEmitter();

  currencies: Currency[] = [];
  form: FormGroup;

  constructor(
    private accountsStore$: Store<AccountState>,
  ) {
    this.form = new FormGroup(
      {
        name: new FormControl(null, [ Validators.required ]),
        currency: new FormControl(null, [ Validators.required ]),
      }
    );

    this.accountsStore$.pipe(select(selectCurrencies)).subscribe((c) => {
      this.currencies = c;
    });
  }

  onClose(): void {
    this.whenClose.emit();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.accountsStore$.dispatch(new CreateAccountAction({
        name: this.form.controls.name.value,
        currencyId: this.form.controls.currency.value
      }));
      this.whenFillForm.emit();
    }
  }

  ngOnInit(): void {
  }

}
