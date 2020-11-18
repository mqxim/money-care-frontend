import {Component, OnInit} from '@angular/core';
import {ActionsSubject, select, Store} from '@ngrx/store';
import {AuthState} from '../../../store/auth/auth.reducer';
import {selectUser} from '../../../store/auth/auth.selectors';
import {map, takeUntil} from 'rxjs/operators';
import TokenService from '../../../services/token.service';
import {AuthActionsTypes, SignInFailureAction, SignOutAction, TrySignInAction} from '../../../store/auth/auth.actions';
import {Router} from '@angular/router';
import {UIState} from '../../../store/ui/ui.reducer';
import {ofType} from '@ngrx/effects';
import {Subject} from 'rxjs';
import {AccountState} from '../../../store/account/account.reducers';
import {LoadCurrenciesAction, LoadUserAccountsAction} from '../../../store/account/account.actions';

@Component({
  selector: 'app-in-app',
  templateUrl: './in-app.component.html',
  styleUrls: ['./in-app.component.scss']
})
export class InAppComponent implements OnInit {
  public isMenuOpen = false;
  public destroy$ = new Subject<boolean>();
  public user$ = this.storeAuth$.pipe(select(selectUser));
  public userFullName$ = this.storeAuth$.pipe(select(selectUser)).pipe(map(u => u?.getFullName()));

  constructor(
    private storeAuth$: Store<AuthState>,
    private uiStore$: Store<UIState>,
    private accountsStore$: Store<AccountState>,
    private router: Router,
    private actions$: ActionsSubject,
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.accountsStore$.dispatch(new LoadUserAccountsAction());
    this.accountsStore$.dispatch(new LoadCurrenciesAction());

    this.actions$
      .pipe(
        ofType<SignInFailureAction>(AuthActionsTypes.SIGN_IN_FAILURE),
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe(async () => await this.router.navigateByUrl('/sign-in'));

    if (TokenService.hasToken()) {
      try {
        const credentials = TokenService.extractCredentialsFromToken(TokenService.getToken());
        await this.storeAuth$.dispatch(new TrySignInAction({email: credentials.email, password: credentials.password}));
        return;
      } catch (e) {
      }
    }

    await this.router.navigateByUrl('/sign-in');
  }

  handleSignOut(): void {
    this.storeAuth$.dispatch(new SignOutAction());
    this.router.navigateByUrl('/sign-in').catch();
  }

  openIfClosed(): void {
    if (this.isMenuOpen) {
    }
  }

  closeIfOpened(): void {

  }
}
