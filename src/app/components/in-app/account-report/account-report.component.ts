import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {AccountReportState} from '../../../store/account-report/account-report.reducer';
import {ActionsSubject, select, Store} from '@ngrx/store';
import {ofType} from '@ngrx/effects';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {
  AccountReportActionsTypes,
  AccountReportLoaded, FailedLoadAccountReport,
  LoadAccountReportAction, SortAccountTransactionsByRecentAction, SortAccountTransactionsBySignificantAction
} from '../../../store/account-report/account-report.actions';
import {UIState} from '../../../store/ui/ui.reducer';
import {UIBeginLoadingAction, UIEndLoadingAction} from '../../../store/ui/ui.actions';
import {selectAccountReport} from '../../../store/account-report/account-report.selectors';
import AccountReport from '../../../models/AccountReport';

export interface CardSettings {
  backgroundColor: string;
  headerBackgroundColor: string;
  headerHeight: string;
  footerBackgroundColor: string;
  footerHeight: string;
}

@Component({
  selector: 'app-account-report',
  templateUrl: './account-report.component.html',
  styleUrls: ['./account-report.component.scss']
})
export class AccountReportComponent implements OnInit {
  destroy$ = new Subject<boolean>();

  cardSettings: CardSettings = {
    backgroundColor: 'rgb(121, 96, 186)',
    headerBackgroundColor: 'rgba(0, 0, 0, 0)',
    headerHeight: '30px',
    footerBackgroundColor: 'rgba(0, 0, 0, 0)',
    footerHeight: '30px',
  };

  form: FormGroup = new FormGroup({
    startDate: new FormControl((() => {
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), 1);
    })()),
    endDate: new FormControl((() => {
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    })())
  });

  accountReport: AccountReport | null;

  id: string | null = null;

  constructor(
    private activateRoute: ActivatedRoute,
    private accountReportStore$: Store<AccountReportState>,
    private uiStore$: Store<UIState>,
    private actions$: ActionsSubject,
  ) {

    accountReportStore$.pipe(select(selectAccountReport)).subscribe((d) => this.accountReport = d);

    activateRoute.params.subscribe(params => {
      this.id = params.id;
      this.onAccountChange();
    });

    this.subscribeOnEvents();
  }

  subscribeOnEvents(): void {
    this.actions$
      .pipe(
        ofType<AccountReportLoaded>(AccountReportActionsTypes.ACCOUNT_REPORT_LOADED),
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.uiStore$.dispatch(new UIEndLoadingAction()));

    this.actions$
      .pipe(
        ofType<FailedLoadAccountReport>(AccountReportActionsTypes.FAILED_LOAD_ACCOUNT_REPORT),
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.uiStore$.dispatch(new UIEndLoadingAction()));
  }

  onAccountChange(): void {
    this.uiStore$.dispatch(new UIBeginLoadingAction());
    setTimeout(() => {
      this.accountReportStore$.dispatch(new LoadAccountReportAction({
        accountId: this.id,
        startDate: this.form.controls.startDate.value.toISOString(),
        endDate: this.form.controls.endDate.value.toISOString(),
      }));
    }, 1000);
  }

  getAbsolute(x: number): number{
    return Math.abs(x);
  }

  onSignificantSort(): void {
    this.uiStore$.dispatch(new UIBeginLoadingAction());
    setTimeout(() => {
      this.accountReportStore$.dispatch(new SortAccountTransactionsBySignificantAction());
      this.uiStore$.dispatch(new UIEndLoadingAction());
    }, 1000);
  }

  onRecentSort(): void {
    this.uiStore$.dispatch(new UIBeginLoadingAction());
    setTimeout(() => {
      this.accountReportStore$.dispatch(new SortAccountTransactionsByRecentAction());
      this.uiStore$.dispatch(new UIEndLoadingAction());
    }, 1000);
  }

  ngOnInit(): void {
  }
}
