import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AuthState} from '../../../store/auth/auth.reducer';
import {selectUser} from '../../../store/auth/auth.selectors';
import {map} from 'rxjs/operators';
import TokenService from '../../../services/token.service';
import {SignOutAction, TrySignInAction} from '../../../store/auth/auth.actions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-in-app',
  templateUrl: './in-app.component.html',
  styleUrls: ['./in-app.component.scss']
})
export class InAppComponent implements OnInit {
  public user$ = this.storeAuth$.pipe(select(selectUser));
  public userFullName$ = this.storeAuth$.pipe(select(selectUser)).pipe(map(u => u?.getFullName()));

  constructor(
    private storeAuth$: Store<AuthState>,
    private router: Router
  ) {
  }

  async ngOnInit(): Promise<void> {
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
}
